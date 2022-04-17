const withPWA = require('next-pwa');
module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public'
  },
  env: {
    HOSTNAME: process.env.HOSTNAME,
    OCULAR_URL: process.env.OCULAR_URL
  },
  images: {
    domains: ['localhost', 'api.ocular-systems.com', 'viltz.ee']
  }
});
