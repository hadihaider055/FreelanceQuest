/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["thumbs.dreamstime.com", "freelancequest.s3.amazonaws.com"],
  },

  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_JWT_SECRET: process.env.NEXTAUTH_JWT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
  },
};

module.exports = nextConfig;
