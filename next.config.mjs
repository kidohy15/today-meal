/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    missingSuspenseWithCSRBailout: false,
  }
};

export default nextConfig;
