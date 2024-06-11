import React from 'react'
import SurveyCard from '../Components/SurveyCard'
import { useQuery } from '@tanstack/react-query'
import api from '../hooks/useAxios'

const SurveyPage = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['all_surveys'],
    queryFn: async () => {
      return api.get('/all_surveys')
    }
  })
  console.log(data?.data);
  if (isLoading) {
    return <div className='h-screen flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div>
  }
  return (<>
    <div className="flex justify-between items-center mb-5">
      <div>
        <label htmlFor="sortBy" className="mr-2">Sort By:</label>
        <select
          id="sortBy"
          className="border rounded-md p-1"
          value={'sortBy'}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="totalVotes">Total Votes</option>
          <option value="createdAt">Date Created</option>
          {/* Add more sorting options if needed */}
        </select>
      </div>
      <div>
        <label htmlFor="filterByCategory" className="mr-2">Filter By Category:</label>
        <select
          id="filterByCategory"
          className="border rounded-md p-1"
          value={'filterByCategory'}
          onChange={(e) => setFilterByCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          {/* Add more category options if needed */}
        </select>
      </div>
    </div>
    <div className='grid gap-5 grid-cols-1 md:grid-cols-3 my-5'>
      {
        data?.data.map((s) => <SurveyCard key={s._id} survey={s} />)
      }
    </div>
  </>
  )
}

export default SurveyPage