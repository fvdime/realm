import AboutUs from '@/components/home-props/about-us'
import FromCommunity from '@/components/home-props/from-community'
import HeroBanner from '@/components/home-props/hero-banner'
import HomeFooter from '@/components/home-props/home-footer'
import HomeNavbar from '@/components/home-props/home-navbar'
import { store } from "@/stores";
import { fetchUser } from "@/stores/user";
import { getToken } from '@/lib/token'

export default async function Home() {
  await store.dispatch(fetchUser(getToken()))
  const { user } = store.getState().user
  const imageServiceUrl = process.env.AWS_BUCKET_URL;
  return (
    <>
      <HomeNavbar user={user} imageServiceUrl={imageServiceUrl || ""} />
      <HeroBanner />
      <FromCommunity />
      <AboutUs />
      <HomeFooter />
    </>
  )
}
