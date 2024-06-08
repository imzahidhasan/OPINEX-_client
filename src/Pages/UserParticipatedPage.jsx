import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../hooks/useAxios'
import useAuth from '../Firebase/useAuth'

const UserParticipatedPage = () => {
    const { user } = useAuth()
    const userInfo = { userName: user?.displayName, userEmail: user?.email }
    const {data,isLoading, } = useQuery({
        queryKey: ['participated_survey'],
        queryFn: async () => {
            const result = await api.post('/get_participated_survey', userInfo)
            return result.data
        }
    })
    console.log(data);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="py-2 px-4 border-b">Survey Name</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((survey, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{survey.title}</td>
                                <td className="py-2 px-4 border-b">{survey.description}</td>
                                <td className="py-2 px-4 border-b">{survey.category}</td>
                                <td className="py-2 px-4 border-b">{survey.deadline}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserParticipatedPage