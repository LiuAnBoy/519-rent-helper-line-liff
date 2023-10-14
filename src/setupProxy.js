const { createProxyMiddleware } = require('http-proxy-middleware');

const API_HOST = process.env.REACT_APP_API_URL || 'http://localhost:8000';

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: API_HOST,
      changeOrigin: true,
    })
  );
  app.use(
    '/auth',
    createProxyMiddleware({
      target: API_HOST,
      changeOrigin: false,
    })
  );
};
