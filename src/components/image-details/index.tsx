import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ImageDetails = () => {
  return (
    <div className='min-h-full w-full p-4'>
      <div className='flex flex-col justify-start items-center'>
        <div className='h-96 w-full relative'>
          <Image src='/hero.png' fill alt='' className='absolute object-contain'/>
        </div>
        <div className='flex w-full flex-row justify-between items-center pt-8'>
          <h1 className='text-sm font-semibold uppercase'>faya</h1>
          <span className='text-sm text-gray-500 font-medium'>April 22, 2023 6:29am</span>
        </div>
        <footer className='flex w-full flex-row justify-between items-center absolute bottom-4 px-4'>
          <div className='flex flex-row w-48 justify-between items-center text-gray-600 text-xs'>
            <Link href='/'>Share:</Link>
            <Link href='/' className='hover:underline'>Instagram</Link>
            <Link href='/' className='hover:underline'>Twitter</Link>
            <Link href='/' className='hover:underline'>Discord</Link>
          </div>
          <div className='flex flex-row w-48 justify-between items-center text-gray-700 text-xs'>
            <Link href='/' className='hover:underline'>Report Image</Link>
            <Link href='/' className='hover:underline'>Privacy and Terms</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default ImageDetails