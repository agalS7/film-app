/** @type {import('next').NextConfig} */
const nextConfig = {
    cacheComponents: true,
    images: {
        remotePatterns: [new URL("https://static.tvmaze.com/**")],
    },
};

export default nextConfig;
