import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../hooks/useAxios'
import { Controller, useForm } from 'react-hook-form'

const ManageUsers = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await api.get('/get_user')
            return res.data
        }
    })

    console.log(data);
    const { register,handleSubmit  } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Serial No.</th>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">
                                        {user.role}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}

export default ManageUsers