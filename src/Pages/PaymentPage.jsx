import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import CheckoutForm from '../Form/CheckoutForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)
const PaymentPage = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default PaymentPage