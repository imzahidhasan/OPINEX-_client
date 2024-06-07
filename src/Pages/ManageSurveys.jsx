import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../hooks/useAxios'

const ManageSurveys = () => {
    const {data,isLoading,isError,error } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await api.get('/all_surveys')
            return res.data
        }
    })
    console.log(data);
  return (
    <div>ManageSurveys</div>
  )
}

export default ManageSurveys