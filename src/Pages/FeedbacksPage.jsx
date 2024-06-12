import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../hooks/useAxios'

const FeedbacksPage = () => {
    const { data: surveys, isLoading } = useQuery({
        queryKey: ['feedbacks'],
        queryFn: async () => {
            const res = await api.get('/feedbacks')
            return res.data
        }
    })
    if (isLoading) {
        return <div className='h-screen flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div>
    }
    return (
        <div>
            <div className="max-w-4xl mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-4">Survey List</h1>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            surveys?.map((survey, idx) => <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{survey?.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{survey?.description.slice(0,20)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{survey?.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{survey?.feedback}</td>
                                
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FeedbacksPage