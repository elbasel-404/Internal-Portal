import type { NextConfig } from "next"
// import withBundleAnalyzer from "@next/bundle-analyzer"
// import withRspack from "next-rspack"

// const withAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// })

const nextConfig: NextConfig = {
  // logging: {
  //   incomingRequests: true,
  //   fetches: {
  //     fullUrl: true,
  //     hmrRefreshes: true,
  //   },
  // },
  eslint: {
    // dirs: ["app"],
    // ignoreDuringBuilds: true,
  },
  experimental: {
    // ppr: "incremental", // needs canary version of next
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
        permanent: false, // Changed to false for development hot reload
      },
    ]
  },
}

export default nextConfig
// export default withAnalyzer(nextConfig)
// export default withRspack(nextConfig)
