const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {    
    app.use(createProxyMiddleware("/products", { target: "http://localhost:3000" }));
    app.use(createProxyMiddleware("/procedimientos", { target: "http://localhost:3000" }));
    app.use(createProxyMiddleware("/bal", { target: "http://localhost:3000" }));
    app.use(createProxyMiddleware("/his", { target: "http://localhost:3000" }));
    app.use(createProxyMiddleware("/suggestions", { target: "http://localhost:3001" }));
    app.use(createProxyMiddleware("/empleados", { target: "http://localhost:3002" }));
};