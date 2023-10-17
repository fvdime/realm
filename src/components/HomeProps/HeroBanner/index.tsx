import Image from 'next/image'
import React from 'react'

const HeroBanner = () => {
  return (
    <div className='bg-zinc-950 h-[60vw] lg:h-[40vw] text-white p-4 mt-8'>
      <div className='max-w-screen-lg mx-auto'>
        <div>
          <h1 className='text-3xl uppercase'>REALM for photographers who can share their works and use as a portfolio website</h1>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner