"use client"

import { useRouter } from 'next/navigation'
import React, { ReactNode, useCallback, useRef } from 'react'

const PhotoModal = ({ children }: { children: ReactNode}) => {

  const overlay = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const router = useRouter();

  const onDismiss =  useCallback(() => {
    router.push('/faya')
  }, [router])

  //for exiting when you click anywhere except the white part
  const handleClick = useCallback((e: React.MouseEvent) => {
    if((e.target === overlay.current) && onDismiss) {
      onDismiss()
    }
  }, [onDismiss, overlay])

  return (
    <div ref={overlay} className='fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/80' onClick={handleClick}>
      <button type='button' onClick={onDismiss} className='absolute top-2 right-8 text-white/80 hover:text-white/20 duration-500 transition-all ease-in'>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>

      <div ref={wrapper} className='flex justify-start items-center flex-col absolute h-[95%] w-full bottom-0 bg-white rounded-t-3xl lg:px-40 px-8 pt-14 pb-72 overflow-auto'>
        {children}
      </div>
    </div>
  )
}

export default PhotoModal