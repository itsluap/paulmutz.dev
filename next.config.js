const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'res.cloudinary.com', 
      'media.dev.to', 
      'media2.dev.to',  // Added 'media2.dev.to'
      'pro.localhost',  // Added support for the pro.localhost subdomain for image loading
    ],
  },
  experimental: {
    appDir: true,  // If you're using the new app directory, enable it
  },
};
