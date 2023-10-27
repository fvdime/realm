import Footer from "@/components/footer"
import HomeNavbar from "@/components/home-props/home-navbar";

export default async function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const imageServiceUrl = process.env.AWS_BUCKET_URL || "";
    return (
        <>
            <HomeNavbar imageServiceUrl={imageServiceUrl} />
            {children}
            <Footer />
        </>
    )
}
