/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: [
            process.env.NEXT_PUBLIC_IMAGE_SERVICE_HOST || "",
            "ui-avatars.com"
        ]
    }
}

module.exports = nextConfig
