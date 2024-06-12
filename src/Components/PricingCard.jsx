import React from 'react';
import { Link } from 'react-router-dom';

const PricingCard = () => {
    return (
        <div className='my-5'>
            <div className="max-w-xs mx-auto border-2 border-gray-200 rounded-lg shadow-lg">
                <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
                    <h2 className="text-lg font-bold">Extended</h2>
                    <p className="text-3xl font-bold">$16</p>
                </div>
                <div className="px-6 py-4">
                    <p className="text-center font-semibold mb-4">Only some features you will get on this package or plan.</p>
                    <ul className="mb-4">
                        <li className="flex items-center mb-2">
                            <span className="flex-grow">Comments on any survey</span>
                            <span className="text-green-500">✔</span>
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="flex-grow">Will be able to see where commented</span>
                            <span className="text-green-500">✔</span>
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="flex-grow">Special Navbar link</span>
                            <span className="text-green-500">✔</span>
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="flex-grow">Unlimited survey </span>
                            <span className="text-red-500">✖</span>
                        </li>
                    </ul>
                    <Link to="/payment">
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                            Purchase
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PricingCard;
