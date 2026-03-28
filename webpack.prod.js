const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  // CSS will be injected via style-loader in dev
  // You can upgrade to MiniCssExtractPlugin later when needed
});