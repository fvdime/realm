import Image from 'next/image'
import React from 'react'
import PhotoCard from '../PhotoCard'

const FromCommunity = () => {
  return (
    <div className='p-4 lg:p-0 max-w-screen-lg mx-auto'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold uppercase'>From Community</h1>
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