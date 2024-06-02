import React from 'react'
import PricingCard from '../Components/PricingCard'

const PricingPage = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-1'>
      <PricingCard/>
      <PricingCard/>
      <PricingCard/>
    </div>
  )
}

export default PricingPage