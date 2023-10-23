"use client"

import React, { useCallback } from 'react'

interface ModalProps {
  isOpen?: boolean,
  title?: string,
  body?: React.ReactElement,
  footer?: React.ReactElement,
  disabled?: boolean, 
  actionLabel?: string,
  onClose: () => void,
  onSubmit: () => void
}

const Modal = ({isOpen, title, body, footer, actionLabel, onClose, onSubmit, disabled}: ModalProps) => {

  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }
    onClose()
  }, [disabled, onClose])

  const handleSubmit= useCallback(() => {
    if (disabled) {
      return
    }
    onSubmit()
  }, [disabled, onSubmit])

  if (!isOpen) {
    return null
  }


  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus-outline-none bg-slate-600 bg-opacity-70">
        <div className="relative w-full lg:w-1/2 md:w-4/5 lg:my-8 mx-auto lg:max-w-3xl h-full md:h-auto">
          <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col  w-full bg-white outline-none focus:outline-none pb-0 md:pb-8">
            <div className="flex items-center justify-between p-10 rounded-t">
              <h3 className="text-xl font-semibold text-gray-950 w-full text-center">{title}</h3>
              <button 
              type="button"
              onClick={handleClose}
              className="text-gray-300 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-200 hover:text-gray-400" data-modal-hide="defaultModal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>
            <div className="relative px-10 py-8">{body}</div>
            <div>
            {footer}
            </div>
            {/* <div className="flex flex-col gap-2">
              <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSubmit}/>
              <button 
              onClick={handleSubmit}
              className='w-full py-4'>
                {actionLabel}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal