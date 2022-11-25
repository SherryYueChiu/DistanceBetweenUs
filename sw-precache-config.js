module.exports = {
  staticFileGlobs: [
      './**.*',
  ],
  runtimeCaching: [{
      urlPattern:  /.*/,
      handler: 'fastest'
  }],
  swFile: 'service-worker.js'
};