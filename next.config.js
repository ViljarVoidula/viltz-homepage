
module.exports = {
  reactStrictMode: true,
  env: {
    HOSTNAME: process.env.HOSTNAME,
    OCULARURL: process.env.OCULARURL
  },
  images:{
    domains: ['localhost', process.env.HOSTNAME, process.env.OCULARURL],
  }
};
