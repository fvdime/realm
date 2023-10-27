/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: [
            "mkgportfoliobucket.s3.eu-central-1.amazonaws.com",
            "ui-avatars.com"
        ]
    }
}

module.exports = nextConfig
