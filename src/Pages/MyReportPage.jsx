import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from '../Firebase/useAuth'
import api from '../hooks/useAxios'

const MyReportPage = () => {
  const { user } = useAuth()
  const userInfo = { userEmail: user?.email }
  const { data,isLoading} = useQuery({
    queryKey: ['reported_survey'],
    queryFn: async () => {
      const result = await api.post('/reported_by', userInfo)
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
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((survey, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{survey.title}</td>
                <td className="py-2 px-4 border-b">{survey.description}</td>
                <td className="py-2 px-4 border-b">{survey.category}</td>
                <td className="py-2 px-4 border-b">{survey.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyReportPage