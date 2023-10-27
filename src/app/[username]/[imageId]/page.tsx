import ImageDetails from '@/components/image-details'
import PhotoModal from '@/components/modals/photo-modal'
import React from 'react'
import { redirect, notFound } from 'next/navigation'
import axios from 'axios'


const getData = async (imageId: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/images/${imageId}`)
  if (res.data?.success)
    return res.data?.image
  else
    return null
}


const ImagePage = async ({ params }: { params: { imageId: string, username: string } }) => {
  const { imageId, username } = params;
  const data = await getData(imageId);
  if (data == null) return notFound()
  if (data?.user?.username != username) return redirect(`/${username}`)
  return (
    <>
      <PhotoModal username={username}>
        <ImageDetails image={data} />
      </PhotoModal>
    </>
  )
}

export default ImagePage