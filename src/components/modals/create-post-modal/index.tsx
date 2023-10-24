"use client"

import React, {useState, useCallback} from 'react'
import useCreatePostModal from '../../../../hooks/useCreatePostModal'
import axios from 'axios'
import toast from 'react-hot-toast'
import Modal from '../modal'

const CreatePostModal = () => {

  const CreatePostModal = useCreatePostModal()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <div className='relative cursor-pointer hover:opacity-50 transition duration-200 ease-in border-dashed border-2 p-20 flex flex-col border-slate-600 justify-center items-center text-slate-800'>
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/>
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 3h-2l-.447-.894A2 2 0 0 0 12.764 1H7.236a2 2 0 0 0-1.789 1.106L5 3H3a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2Z"/>
        </svg>
      </div>
      <button type="submit" className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
    </div>
    )

  const FooterContent = (
    <div className='text-gray-400 text-center mt-1'>
      <p>I agree with the  
      <span 
        className='text-sky-700 cursor-pointer hover:underline'> terms and conditions.</span>
      </p>
    </div>
  )

  return (
    <Modal 
      isOpen={CreatePostModal.isOpen}
      title='Create a post!'
      onClose={CreatePostModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
      footer={FooterContent}
    />
  )
}

export default CreatePostModal