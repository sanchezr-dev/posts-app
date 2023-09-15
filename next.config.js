/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf")

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "posts",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./home": "./src/pages/index.tsx",
        },
        remotes: {},
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      }),
    )

    return config
  },
}

module.exports = nextConfig
