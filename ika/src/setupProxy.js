const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware("/products", { target: "http://localhost:3000" }));
    app.use(createProxyMiddleware("/procedimientos", { target: "http://localhost:3000" }));
    app.use(createProxyMiddleware("/bal", { target: "http://localhost:3000" }));
    app.use(createProxyMiddleware("/his", { target: "http://localhost:3000" }));
    app.use(createProxyMiddleware("/reviews", { target: "http://localhost:3001" }));
    app.use(createProxyMiddleware("/empleados", { target: "http://localhost:3002" }));
    app.use(createProxyMiddleware("/login", { target: "http://localhost:3002" }));
    app.use(createProxyMiddleware("/salario", { target: "http://localhost:3002" }));
    app.use(createProxyMiddleware("/join", { target: "http://localhost:3002" }));
    app.use(createProxyMiddleware("/delete", { target: "http://localhost:3002" }));
    app.use(createProxyMiddleware("/edit", { target: "http://localhost:3002" }));
    app.use(createProxyMiddleware("/categories", {target: "http://localhost:3000" }));
};
