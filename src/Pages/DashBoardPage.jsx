import React from 'react'
import useAuth from '../Firebase/useAuth'

const DashBoardPage = () => {
  const { userRole } = useAuth()
  if (userRole === 'surveyor') {
    return (<>
      
    </>)
  }
  return (
    <div>DashBoardPage</div>
  )
}

export default DashBoardPage