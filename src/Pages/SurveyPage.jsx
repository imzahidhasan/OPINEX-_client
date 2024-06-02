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
    return <h1>LOading....</h1>
  }
  return (
    <div className='grid gap-5 grid-cols-1 md:grid-cols-3 my-5'>
      {
        data?.data.map((s) => <SurveyCard key={s._id} survey={s}/>)
      }
    </div>
  )
}

export default SurveyPage