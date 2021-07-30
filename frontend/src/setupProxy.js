const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(createProxyMiddleware("/cards", { target: "http://backend:8000" }));
};
