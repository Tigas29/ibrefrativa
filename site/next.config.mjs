/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Apenas imagens locais em /public — sem domínios externos
    unoptimized: false,
  },
};

export default nextConfig;
