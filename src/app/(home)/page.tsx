import AboutUs from '@/components/home-props/about-us'
import FromCommunity from '@/components/home-props/from-community'
import HeroBanner from '@/components/home-props/hero-banner'
import HomeFooter from '@/components/home-props/home-footer'
import HomeNavbar from '@/components/home-props/home-navbar'
import { store } from "@/stores";
import { fetchUser } from "@/stores/user";

export default async function Home() {
  await store.dispatch(fetchUser())
  const { user } = store.getState().user
  const imageServiceUrl = process.env.AWS_BUCKET_URL;
  console.log(user)
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
