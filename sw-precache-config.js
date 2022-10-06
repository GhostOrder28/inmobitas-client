module.exports = {
  stripPrefix: '../inmobitas-api/public/',
  staticFileGlobs: [
    '../inmobitas-api/public/*.html',
    '../inmobitas-api/public/manifest.json',
    '../inmobitas-api/public/static/**/!(*map*)'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: '../inmobitas-api/public/service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /signin/,
      handler: 'networkOnly'
    }
  ]
};
