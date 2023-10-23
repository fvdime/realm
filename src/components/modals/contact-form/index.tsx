"use client"

import React, {useState, useCallback} from 'react'
import useContactModal from '../../../../hooks/useContactForm'
import axios from 'axios'
import toast from 'react-hot-toast'
import Modal from '../modal'

const ContactFormModal = () => {

  const ContactFormModal = useContactModal()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <div className='grid gap-2 grid-cols-2'>
        <div>
        <label htmlFor="first_name" className="block mb-2 text-sm font-semibold text-gray-900">First Name</label>
        <input 
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text" 
        id="first_name" 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" 
        required />
      </div> 
      <div>
        <label htmlFor="last_name" className="block mb-2 text-sm font-semibold text-gray-900 ">Last Name</label>
        <input 
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" required />
      </div> 
    </div>
    <div>
        <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900">Email address</label>
        <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@example.com" required />
    </div> 
    <div>
        <label htmlFor="message" className="block mb-2 text-sm font-semibold text-gray-900">Your Message</label>
        <textarea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        id="message" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@example.com" required />
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
      isOpen={ContactFormModal.isOpen}
      title='Contact with creator!'
      actionLabel='Submit'
      onClose={ContactFormModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
      footer={FooterContent}
    />
  )
}

export default ContactFormModal