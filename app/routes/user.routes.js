module.exports = app => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();
  // 新增使用者 (注冊)
  router.post("/register", users.register);
  router.post("/login", users.login);
  app.use('/api/users', router);
};