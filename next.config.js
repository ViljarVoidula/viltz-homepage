module.exports = {
  reactStrictMode: true,
  env: {
    HOSTNAME: process.env.HOSTNAME,
    OCULAR_URL: process.env.OCULAR_URL
  },
  images: {
    domains: ['localhost', 'api.ocular-systems.com', 'viltz.ee']
  }
};
