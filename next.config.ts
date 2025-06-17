import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  experimental: {
    // reactCompiler: true,
    serverActions: {
      // TODO: test this more
      allowedOrigins: [
        new URL(process.env.NEXT_PUBLIC_ORIGIN ?? "http://localhost:3000").host,
      ],
    },
  },
  output: "standalone",
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
