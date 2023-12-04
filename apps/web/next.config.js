/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: "standalone",
  images: {
    domains: ["res.cloudinary.com"],
  },
};
