import React, { useState, useEffect } from 'react'
import SurveyCard from '../Components/SurveyCard'
import { useQuery } from '@tanstack/react-query'
import api from '../hooks/useAxios'

const SurveyPage = () => {
  const [survey, setSurvey] = useState([])
  const [sortBy, setSortBy] = useState('totalVotes')
  const [filterByCategory, setFilterByCategory] = useState('')

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['all_surveys'],
    queryFn: async () => {
      const result = await api.get('/all_surveys')
      return result.data
    }
  })

  useEffect(() => {
    if (data) {
      setSurvey(data)
    }
  }, [data])

  if (isLoading) {
    return <div className='h-screen flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div>
  }

  const sortedAndFilteredSurveys = survey
    .filter(s => filterByCategory === '' || s.category === filterByCategory)
    .sort((a, b) => {
      if (sortBy === 'totalVotes') {
        const totalVotesA = a.yesCount + a.noCount
        const totalVotesB = b.yesCount + b.noCount
        return totalVotesB - totalVotesA
      } else if (sortBy === 'createdAt') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      return 0
    })

  return (
    <>
      <div className="flex flex-col md:flex-row justify-around items-center mb-5">
        <div className='my-5'>
          <label htmlFor="sortBy" className="mr-2">Sort By:</label>
          <select
            id="sortBy"
            className="border rounded-md p-1"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="totalVotes">Total Votes</option>
            <option value="createdAt">Date Created</option>
          </select>
        </div>
        <div>
          <label htmlFor="filterByCategory" className="mr-2">Filter By Category:</label>
          <select
            id="filterByCategory"
            className="border rounded-md p-1"
            value={filterByCategory}
            onChange={(e) => setFilterByCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className='grid gap-5 grid-cols-1 md:grid-cols-3 my-5'>
        {
          sortedAndFilteredSurveys.map((s) => <SurveyCard key={s._id} survey={s} />)
        }
      </div>
    </>
  )
}

export default SurveyPage
