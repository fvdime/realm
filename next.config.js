/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: [
            //process.env.NEXT_PUBLIC_IMAGE_SERVICE_HOST
            "mkgportfoliobucket.s3.eu-central-1.amazonaws.com"
        ]
    }
}

module.exports = nextConfig
