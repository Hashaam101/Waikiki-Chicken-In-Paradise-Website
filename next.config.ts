import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ['lh3.googleusercontent.com', 'sun-tea-mix.vercel.app'],
    unoptimized: true,
  },
  trailingSlash: true,
};


export default nextConfig;
