import type { NextConfig } from "next"
import withBundleAnalyzer from "@next/bundle-analyzer"

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = {
  eslint: {
    // dirs: ["app"],
    // ignoreDuringBuilds: true,
  },
  experimental: {
    // ppr: "incremental", // needs canary version of next
    reactCompiler: true,
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

export default withAnalyzer(nextConfig)
