import Footer from '@/components/footer'
import HomeNavbar from '@/components/home-props/home-navbar'
import Masonry from '@/components/masonry'
import UserInfo from '@/components/profile/user-info'
import React from 'react'

const UserPage = () => {
  return (
    <div className='max-w-screen-lg mx-auto p-4 lg:p-0'>
      <HomeNavbar/>
      <div className='mt-16'>
        <UserInfo/>
      <Masonry/>
      </div>
      <Footer/>
    </div>
  )
}

export default UserPage