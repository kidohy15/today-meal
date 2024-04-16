/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // serverActions: true, => 14버전에서 디폴트값으로 보임 Server Actions are available by default now
    missingSuspenseWithCSRBailout: false,
  }
};

export default nextConfig;
