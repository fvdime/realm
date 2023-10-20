import React from 'react'
import PhotoCard from '../../photo-card'

const FromCommunity = () => {
  return (
    <div className='p-4 lg:p-0 max-w-screen-lg mx-auto my-8'>
      <h1 className='text-xl lg:text-2xl font-semibold uppercase'>From Community</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        <PhotoCard/>
        <PhotoCard/>
        <PhotoCard/>
        <PhotoCard/>
        <PhotoCard/>
        <PhotoCard/>
      </div>
    </div>
  )
}

export default FromCommunity