import Footer from '@/components/footer'
import HomeNavbar from '@/components/home-props/home-navbar'
import Masonry from '@/components/masonry'
import UserInfo from '@/components/profile/user-info'
import React from 'react'
import { store } from "@/stores";
import { fetchUser } from "@/stores/user";
import { fetchProfile } from "@/stores/profile"
import { notFound } from 'next/navigation'

const UserPage = async ({ params }: { params: { username: string } }) => {
  await store.dispatch(fetchProfile(params.username))
  const profile = store.getState().profile
  if (!profile?.user?.username) return notFound()
  const imageServiceUrl = process.env.AWS_BUCKET_URL;
  return (
    <div className='max-w-screen-lg mx-auto p-4 lg:p-0'>
      <HomeNavbar imageServiceUrl={imageServiceUrl || ""} />
      <div className='mt-16'>
        <UserInfo user={profile.user} imageServiceUrl={imageServiceUrl || ""} />
        <Masonry />
      </div>
      <Footer />
    </div>
  )
}

export default UserPage