/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};


module.exports = {
  async rewrites() {
    return [
      {
        source: "/products",
        destination: "http://localhost:8000/products",
      },
    ];
  },
};
