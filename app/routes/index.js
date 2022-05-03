module.exports = app => {
  // API 所有路徑寫這裡
  require("./tutorial.routes")(app);
  require("./user.routes")(app);
};