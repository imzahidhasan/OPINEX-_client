import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../hooks/useAxios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import Recharts components

const SurveyDashboard = () => {
    const { id } = useParams();
    const [showChart, setShowChart] = useState(false); // State to toggle chart display

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['survey', id],
        queryFn: async () => {
            const response = await api.get(`/survey/${id}`);
            return response.data;
        }
    });

    if (isLoading) {
        return <div className='h-screen flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div>
    }

    if (isError) {
        return <h1>Error loading survey: {error.message}</h1>;
    }

    const {
        title,
        description,
        category,
        deadline,
        createdAt,
        questionTitle,
        questionDescription,
        status,
        yesCount,
        noCount,
        voter
    } = data;

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                <p className="text-gray-700 mb-2">{description}</p>
                <p className="text-gray-700 mb-2"><strong>Title:</strong> {questionTitle}</p>
                <p className="text-gray-700 mb-2"><strong>Description:</strong> {questionDescription}</p>
                <div className='grid grid-cols-1 gap-4 my-2 md:grid-cols-3'>
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-green-600">Yes:</span>
                        <span>{yesCount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-red-600">No:</span>
                        <span>{noCount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="font-bold">Total Vote:</span>
                        <span>{noCount + yesCount}</span>
                    </div>
                    <p className="text-gray-700 mb-2"><strong>Category:</strong> {category}</p>
                    <p className="text-gray-700 mb-2"><strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}</p>
                    <p className="text-gray-700 mb-2"><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
                </div>

                <button
                    onClick={() => setShowChart(!showChart)} // Toggle chart display
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {showChart ? 'Hide Chart' : 'Show Chart'}
                </button>

                {showChart && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-2">Survey Results Chart</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={[
                                    { name: 'Yes', count: yesCount },
                                    { name: 'No', count: noCount }
                                ]}
                                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                            >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                <div>
                    <h3 className="text-xl font-semibold mb-2">Voters Information</h3>
                    {voter.length === 0 ? (
                        <p className="text-gray-700">No voters yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="text-left px-4 border-b">Serial No</th>
                                        <th className="text-left px-4 border-b">User Name</th>
                                        <th className="text-left px-4 border-b">User Email</th>
                                        <th className="text-left px-4 border-b">Vote</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {voter.map((v, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border-b">{index + 1}</td>
                                            <td className="py-2 px-4 border-b">{v.userName}</td>
                                            <td className="py-2 px-4 border-b">{v.userEmail}</td>
                                            <td className="py-2 px-4 border-b">{v.vote}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SurveyDashboard;
