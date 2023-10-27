import Image from 'next/image'
import React from 'react'

const PhotoCard = () => {
  return (
    <div>
      <div className='h-96 max-w-full flex flex-col items-start justify-center'>
        <div className='w-full h-4/5 relative'>
          <Image src="/3.jpg" fill alt='' className='object-cover' />
        </div>
        <div className='flex flex-row items-center justify-start w-full gap-4 mt-1'>
          <Image src="/3.jpg" width={32} height={32} alt='' className='object-cover rounded-full' />
          <h2 className='text-xs font-semibold text-gray-700'>/some username</h2>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard