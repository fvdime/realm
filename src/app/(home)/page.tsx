import AboutUs from '@/components/home-props/about-us'
import FromCommunity from '@/components/home-props/from-community'
import HeroBanner from '@/components/home-props/hero-banner'
import HomeFooter from '@/components/home-props/home-footer'
import HomeNavbar from '@/components/home-props/home-navbar'

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
