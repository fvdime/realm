import Image from 'next/image'
import React from 'react'

const AboutUs = () => {
  return (
    <div className='h-full w-full bg-slate-400'>
      <div className='max-w-screen-lg mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-4'>
          <div className='h-96 border-x border-t border-slate-800 p-1 flex flex-col justify-between items-end'>
            <h2 className='font-bold text-2xl lg:text-3xl break-words text-end'>REALM for photographers</h2>
            <h2 className='text-9xl font-semibold'>1</h2>
          </div>
          <div className='h-96 border-r border-t border-slate-800 p-1 flex flex-col justify-between items-end'>
            <h2 className='font-bold text-2xl lg:text-3xl break-words text-end'>Share your <br /> work <br />
            <span className='text-sm tracking-tight text-slate-900 leading-tight'>with an engaged community, free from the pressure of likes or follower counts.</span>
            </h2>
            <h2 className='text-9xl font-semibold'>2</h2>
          </div>
          <div className='h-96 border-r border-t border-slate-800 p-1 flex flex-col justify-between items-end relative'>
          <Image src="/flower2.jpg" fill alt='' className='object-cover' />
            <h2 className='font-bold text-2xl lg:text-3xl break-words text-end z-10'>Use as a portfolio website</h2>
            <h2 className='text-9xl font-light z-10'>𝟛</h2>
          </div>
          <div className='h-96 border-r border-t border-slate-800 p-1 flex flex-col justify-between items-end'>
            <h2 className='font-bold text-2xl lg:text-3xl break-words text-end'>Use as a portfolio website</h2>
            <h2 className='text-9xl font-semibold'>4</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs