import Image from 'next/image'
import React from 'react'

const UserInfo = () => {
  return (
    <div>
      <div className="my-8 flex flex-col items-center justify-center w-full gap-x-4">
        <Image width={96} height={96} alt='' src='/3.jpg' className='object-cover rounded-full'/>
        <div className='text-center my-4'>
        <h1 className='font-semibold text-lg uppercase mb-2'>faya</h1>
        {/* <span className='text-gray-600 text-sm'>@theffaya</span> */}
        <p className='text-gray-600 text-xs mt-4'>some bio information from user</p>
        <button className="self-center mt-8 border px-8 py-1.5 rounded-3xl text-white uppercase text-xs hover:text-gray-950 bg-gray-950 border-gray-950 hover:bg-white duration-500 transition-all ease-in">Contact</button>
        </div>
      </div>
    </div>
  )
}

export default UserInfo