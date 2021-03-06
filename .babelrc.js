const git = require('git-rev-sync');

module.exports = {
  presets: [
    [
      'env',
      {
        targets: {
          browsers: [
            'last 2 chrome versions',
            'last 2 safari versions',
            'last 2 edge versions',
            'last 2 iOS versions',
            'last 2 ChromeAndroid versions'
          ]
        }
      }
    ]
  ],
  plugins: [
    'react-native-web',
    [
      'transform-define',
      {
        'process.env.GIT_REVISION': git.long()
      }
    ]
  ]
};
