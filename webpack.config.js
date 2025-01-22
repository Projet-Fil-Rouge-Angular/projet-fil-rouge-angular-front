const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      path: `.env.${process.env.NODE_ENV || 'development'}`,
      systemvars: true,
    }),
  ],
};
