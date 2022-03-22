// const { join } = require('path')
// const { InjectManifest } = require('workbox-webpack-plugin')
// const { env } = require('process')

// const getPublicPath = (subPath) => join(__dirname, 'public', subPath)

// const getPluginConfig = () => {
//   const baseConfig = {
//     swSrc: getPublicPath('service-worker-sync.js'),
//     maximumFileSizeToCacheInBytes: 100 * 1024 * 1024,
//     exclude: [
//       /\.map$/,
//       /manifest$/,
//       /\.htaccess$/,
//       /service-worker-sync\.js$/,
//       /serviceworker\.js$/,
//       /serviceWorkerRegistration\.js$/,
//       /sw\.js$/,
//     ],
//   }
//   if (env.NODE_ENV === 'production') {
//     return {
//       ...baseConfig,
//       swDest: getPublicPath('service-worker.js'),
//       include: [/\.svg$/, /\.html$/, /\.css$/, /\.js$/],
//     }
//   }
//   return baseConfig
// }

// const getInjectManifestPlugin = () => {
//   const config = getPluginConfig()
//   return new InjectManifest(config)
// }

// const getWebpackConfig = (config) => {
//   const configuredPlugin = getInjectManifestPlugin()
//   return {
//     ...config,
//     plugins: [...config.plugins, configuredPlugin],
//   }
// }

// module.exports = {
//   webpack: getWebpackConfig,
// }







// // todo

const TerserPlugin = require('terser-webpack-plugin');

const { join } = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')
const { env } = require('process')

const getPublicPath = (subPath) => join(__dirname, 'public', subPath)

const getPluginConfig = () => {
  const baseConfig = {
    swSrc: getPublicPath('service-worker-sync.js'),
    maximumFileSizeToCacheInBytes: 100 * 1024 * 1024,
    // swDest: 'sw.js',
    // exclude: [
    //   /\.map$/,
    //   /manifest$/,
    //   /\.htaccess$/,
    //   /service-worker\.js$/,
    //   /serviceWorkerRegistration\.js$/,
    //   /sw\.js$/,
    // ],
  }
  if (env.NODE_ENV === 'production') {
    // return {
    //   ...baseConfig,
    //   swDest: getPublicPath('service-worker.js'),
    //   include: [/\.svg$/, /\.html$/, /\.css$/, /\.js$/],
    // }
  }
  return baseConfig
}

// const getInjectManifestPlugin = () => {
//   const config = getPluginConfig()
//   return new InjectManifest(config)
// }

// const getWebpackConfig = (config) => {
//   const configuredPlugin = getInjectManifestPlugin()
//   return {
//     ...config,
//     plugins: [...config.plugins, configuredPlugin],
//   }
// }

module.exports = {
  // webpack: getWebpackConfig,
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
}
