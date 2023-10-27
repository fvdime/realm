import HomeNavbar from "@/components/home-props/home-navbar";
import HeroBanner from '@/components/home-props/hero-banner'
import HomeFooter from '@/components/home-props/home-footer'
import AboutUs from '@/components/home-props/about-us'

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const imageServiceUrl = process.env.AWS_BUCKET_URL || "";
    return (
        <>
            <HomeNavbar imageServiceUrl={imageServiceUrl} />
            <HeroBanner />
            <div className='p-4 lg:p-0 max-w-screen-lg mx-auto my-8'>
                <h1 className='text-xl lg:text-2xl font-semibold uppercase'>From Community</h1>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {children}
                </div>
            </div>
            <AboutUs />
            <HomeFooter />
        </>
    )
}
