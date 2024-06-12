import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import api from "../hooks/useAxios";
import { useEffect, useState } from "react";
import useAuth from "../Firebase/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        api.post('/create-payment-intent', { amount: 1600 })
            .then((response) => {
                setClientSecret(response.data.clientSecret);
            })
            .catch((err) => {
                setError("Failed to initialize payment.");
                console.error(err);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet.
            return;
        }

        setIsProcessing(true);
        setError(null);

        const card = elements.getElement(CardElement);

        if (card == null) {
            setError("Card information is not available.");
            setIsProcessing(false);
            return;
        }

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            setIsProcessing(false);
            return;
        }

        const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName
                }
            }
        });

        if (paymentError) {
            setError(paymentError.message);
            setIsProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            Swal.fire({
                icon: 'success',
                text: 'Your payment was successful',
                title: "Successful!"
            });
            setPaymentSuccess(true);
            setError(null);

            // Save payment information to backend
            try {
                const paymentInfo = {
                    paymentIntentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                    user: {
                        email: user?.email,
                        displayName: user?.displayName
                    }
                };

                const response = await api.post('/save-payment', paymentInfo);
               
                // Update user role
                await api.post(`/update_role/${user?.email}`, { role: 'pro_user' });

                navigate('/');
            } catch (saveError) {
                console.error('Error saving payment data:', saveError);
                Swal.fire({
                    icon: 'error',
                    text: 'There was an issue saving your payment data. Please contact support.',
                    title: "Error!"
                });
            }
        } else {
            setError("Payment failed.");
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                    hidePostalCode: true
                }}
                className="p-4 border rounded-lg"
            />
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {paymentSuccess && <div className="text-green-500 mt-2">Payment successful!</div>}
            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className={`mt-4 px-4 py-2 text-white rounded-lg ${isProcessing ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} disabled:opacity-50`}
            >
                {isProcessing ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default CheckoutForm;
