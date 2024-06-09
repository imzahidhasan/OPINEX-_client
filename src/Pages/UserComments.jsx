import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../hooks/useAxios'

const UserComments = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['comment'],
    queryFn: async () => {
      const result = await api.post('/get_commented_surveys')
      return result.data
    }
  })
  console.log(data);
  return (
    <div>UserComments</div>
  )
}

export default UserComments