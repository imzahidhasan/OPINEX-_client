import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../hooks/useAxios'
import useAuth from '../Firebase/useAuth'

const UserComments = () => {
  const { user } = useAuth()
  const userEmail = user?.email

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['comment', userEmail], // Include email in query key for uniqueness
    queryFn: async () => {
      const result = await api.post('/get_commented_surveys', { userEmail })
      return result.data
    }
  })

  if (isLoading) {
    <div className='h-screen flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border-b">Survey Name</th>
              <th className="py-2 px-4 border-b">Survey Question</th>
              <th className="py-2 px-4 border-b">Your Comments</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((survey, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{survey.title}</td>
                <td className="py-2 px-4 border-b">{survey.questionDescription}</td>
                <td className="py-2 px-4 border-b">
                  {survey.comment
                    .filter(comment => comment.userEmail === userEmail)
                    .map((comment, idx) => (
                      <div key={idx}>
                        <p>{comment.comment}</p>
                      </div>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserComments
