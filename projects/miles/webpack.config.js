const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'miles',

  exposes: {
    './Component': './projects/miles/src/app/app.component.ts',
  },

  // Disable sharing for this demo:
  shared: { }

  // shared: {
  //   ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  // },

});
