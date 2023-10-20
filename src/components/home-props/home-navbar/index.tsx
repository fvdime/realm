"use client"

import Image from 'next/image'
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
              <span className='text-slate-400 font-extrabold'>.</span>
            </div>
            <div className='flex flex-row gap-1 items-center justify-end'>
              {/* idkkkkkkkkkkkkkk */}
              <Link href="/profile">
                <Image src='/flower2.jpg' alt='' width={24} height={24} className='object-cover rounded-full' />
              </Link>
            </div>
          </div>
        <hr className='min-w-full' />
        <div className='flex flex-row items-center justify-between w-full font-medium text-sm'>
          {active && 
            <>
              <Link href="/" className='text-sm font-medium'>Realm Business</Link>
                <Link href="/" className='text-sm font-medium'>Become a Part</Link>
                <Link href="/" className='text-sm font-medium'>Contact</Link>
                <Link href="/" className='text-sm font-medium'>Source</Link>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default HomeNavbar