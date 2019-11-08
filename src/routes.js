const routes = require("express").Router();

routes.get("/hello", function(req, res) {
  res.send("hello world");
});

routes.get("/painel", function(req, res) {
  res.sendfile("public/index.html");
});

module.exports = routes;
