/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "ghfdswwacjqpntxdmcxb.supabase.co", // Replace with your actual Supabase project reference
            port: "",
            pathname: "/storage/v1/object/public/ebook_cover_images/**", // This pattern ensures it matches all images in the public storage path
          },
        ],
      },
};

export default nextConfig;
