import AboutUs from '@/components/AboutUs'
import FromCommunity from '@/components/FromCommunity'
import HeroBanner from '@/components/HomeProps/HeroBanner'
import HomeFooter from '@/components/HomeProps/HomeFooter.tsx'
import HomeNavbar from '@/components/HomeProps/HomeNavbar.tsx'

export default function Home() {
  return (
    <>
      <HomeNavbar/>
      <HeroBanner/>
      <FromCommunity/>
      <AboutUs/>
      <HomeFooter/>
    </>
  )
}
