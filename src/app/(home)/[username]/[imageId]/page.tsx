import ImageDetails from '@/components/image-details'
import PhotoModal from '@/components/modals/photo-modal'
import React from 'react'

const ImagePage = () => {
  return (
    <>
      <PhotoModal>
        <ImageDetails/>
      </PhotoModal>
    </>
  )
}

export default ImagePage