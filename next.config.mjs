import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
};

const nextConfigFunction = async (phase) => {
  if (phase !== "phase-development-server") {
    const pwaConfig = withPWA({
      dest: "public",
      register: true,
      skipWaiting: true,
      reloadOnOnline: true,
    });
    return pwaConfig(nextConfig);
  }
  return nextConfig;
};

export default nextConfigFunction;
