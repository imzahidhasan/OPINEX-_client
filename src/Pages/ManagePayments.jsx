import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../hooks/useAxios'

const ManagePayments = () => {
  const { data:payments, isLoading } = useQuery({
    queryKey: ['payment_info'],
    queryFn: async () => {
      const response = await api.get('/get_payment_info')
      return response.data
    }
  })
  if (isLoading) {
    return <div className='h-screen flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div>
  }
  return (
    <div>
      <div className="mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Payment ID</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">User Name</th>
                <th className="py-2 px-4">User Email</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment) => (
                <tr key={payment._id} className="border-b">
                  <td className="py-2 px-4">{payment.paymentIntentId}</td>
                  <td className="py-2 px-4">{payment.amount}</td>
                  <td className="py-2 px-4">{payment.userName}</td>
                  <td className="py-2 px-4">{payment.userEmail}</td>
                  <td className="py-2 px-4">{new Date(payment.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManagePayments