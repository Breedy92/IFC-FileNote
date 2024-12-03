/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore TypeScript build errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  api: {
    // Increase request body size limit to handle larger SOA prompts
    bodyParser: {
      sizeLimit: '2mb', // Adjust this value as needed
    },
  },
  poweredByHeader: false, // Remove "X-Powered-By" header for security
  reactStrictMode: true, // Enable React strict mode for better development feedback
  swcMinify: true, // Use SWC for faster builds and smaller bundles
};

module.exports = nextConfig;
