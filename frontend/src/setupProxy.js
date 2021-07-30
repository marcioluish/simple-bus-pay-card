const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(createProxyMiddleware("/cardsj", { target: "http://backend:8000" }));
};
