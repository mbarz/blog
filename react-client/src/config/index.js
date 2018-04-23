let config = require('./config.prod.json');

if (process.env.NODE_ENV !== 'production') {
  config = require('./config.json');
}

export default config;
