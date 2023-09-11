const path = require('path');

module.exports = {
  // Outras configurações do webpack aqui...

  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
    },
  },

  // Outras configurações do webpack aqui...
};
