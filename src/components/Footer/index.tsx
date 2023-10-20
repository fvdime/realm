import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>    
      <footer className="bg-white p-0">
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">

            <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link href="/" className="text-xs font-bold uppercase">Realm<span className='text-slate-400 font-extrabold'>.</span></Link>
   
                <span className="text-xs text-gray-400 sm:text-center ">© 2023 <Link href="/" className="hover:underline">Realm™</Link>. All Rights Reserved.
                </span>               
            </div>
          </div>
      </footer>
    </div>
  )
}

export default Footer