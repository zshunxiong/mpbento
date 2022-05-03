const { Sequelize } = require('sequelize');
const dbConfig = require("../config/db.config.js");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.sequelize = sequelize;
// 資料表引入寫這裏
db.tutorials = require("./tutorial.model.js")(sequelize);
db.users = require("./user.model.js")(sequelize);
module.exports = db;