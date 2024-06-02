import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../hooks/useAxios'

const AllSurveyPage = () => {
  const { data } = useQuery({
    queryKey: ['surveys'], queryFn:async () => {
      return api.get('/all_surveys')
    }
  })
  return (
    <div>AllSurveyPage</div>
  )
}

export default AllSurveyPage