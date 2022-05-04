module.exports = app => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();
  // 注冊
  router.post("/register", users.register);
  // 登入
  router.post("/login", users.login);
  app.use('/api/users', router);
};