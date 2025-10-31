/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL("https://static.tvmaze.com/**")],
    },
};

export default nextConfig;
