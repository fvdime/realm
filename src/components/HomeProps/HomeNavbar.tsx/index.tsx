"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const HomeNavbar = () => {

  const [active, setActive] = useState(false)

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false)
  }
  useEffect(() => {
    window.addEventListener("scroll", isActive)

    return () => {
      window.removeEventListener("scroll", isActive)
    }
  }, [])

  return (
    <div className={active ? "bg-white text-black fixed w-full top-0 left-0 z-20" : "bg-zinc-950 text-white transition-all ease duration-500 fixed w-full top-0 left-0 z-20"}>
       <div className='max-w-screen-lg mx-auto p-2 lg:px-0'>
          <div className='flex flex-row justify-between items-center mb-2'>
            <div>
              <span className='uppercase font-semibold'>realm</span>
              <span className='text-fuchsia-400 font-extrabold'>.</span>
            </div>
            <div className='flex flex-row gap-1 items-center justify-end'>
              <div className='hidden md:flex flex-row items-center gap-2'>
                <Link href="/" className='text-sm font-medium'>Realm Business</Link>
                <Link href="/" className='text-sm font-medium'>Explore</Link>
                <Link href="/" className='text-sm font-medium'>Sign in</Link>
                {/* i am gonna think about it */}
                <Link href="/" className='text-sm font-medium'>Become a Part</Link>
              </div>
              <div>
              <Link href="/auth" className='border rounded-lg px-4 py-1 text-sm font-medium'>Join</Link>
              </div>
            </div>
          </div>
        <hr className='min-w-full' />
        <div className='flex flex-row items-center justify-between w-full font-medium text-sm'>
          {active && 
            <>
              <span>aaaaa</span>
              <span>aaaaa</span>
              <span>aaaaa</span>
              <span>aaaaa</span>
              <span>aaaaa</span>
              <span>aaaaa</span>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default HomeNavbar