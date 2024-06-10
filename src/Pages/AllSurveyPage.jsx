import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../hooks/useAxios'
import useAuth from '../Firebase/useAuth'
import { Link } from 'react-router-dom'
import { TbListDetails } from 'react-icons/tb'
import { TfiWrite } from 'react-icons/tfi'

const AllSurveyPage = () => {
  const { user } = useAuth()
  const { data } = useQuery({
    queryKey: ['surveys'], queryFn: async () => {
      return api.get(`/surveys/${user?.email}`)
    }
  })
  const surveys = data?.data
  return (
    <div>
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Survey List</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {
              surveys?.map((survey, idx) => <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{survey?.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{survey?.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{survey?.deadline}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/dashboard/surveyor/update/${survey?._id}`} >
                    <TfiWrite className='text-2xl hover:text-blue-500' />
                  </Link>
              </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/dashboard/surveyor/surveys/${survey?._id}`} >
                    <TbListDetails className='text-2xl hover:text-blue-500' />
                  </Link>
              </td>
              </tr>)
            }

        </tbody>
      </table>
    </div>
    </div >
  )
}

export default AllSurveyPage