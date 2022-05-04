module.exports = app => {
  const restaurants = require("../controllers/restaurant.controller");
  var router = require("express").Router();
  // 列表查詢
  router.get("/", restaurants.findAll);
  // 單筆查詢
  router.get("/:id", restaurants.findOne);
  // 新增
  router.post("/", restaurants.create);
  // 編輯
  router.post("/:id", restaurants.update);
  // 刪除
  router.delete("/:id", restaurants.delete);
  app.use('/api/restaurants', router);
};