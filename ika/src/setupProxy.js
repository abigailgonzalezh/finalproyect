const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {    
    app.use(createProxyMiddleware("/productos", { target: "http://localhost:3000" }));
    app.use(createProxyMiddleware("/sugerencias", { target: "http://localhost:3001" }));
};