import React from 'react'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto min-h-96'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App