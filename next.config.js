
module.exports = {
  reactStrictMode: true,
  env: {
    HOSTNAME: process.env.HOSTNAME,
    OCULARURL: process.env.OCULARURL
  },
  images:{
    domains: ['localhost','api.ocular-systems.com', 'viltz.ee'],
  }
};
