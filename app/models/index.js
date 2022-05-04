const { Sequelize } = require('sequelize');
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, dbConfig);
const db = {};
db.sequelize = sequelize;

// 資料表引入寫這裏
db.users = require("./user.model")(sequelize);
db.restaurants = require("./restaurant.model")(sequelize);
db.orders = require("./order.model")(sequelize);
db.meals = require("./meal.model")(sequelize);
db.orderedMeals = require("./orderedMeal.model")(sequelize);

// 資料表關聯寫這裏
db.users.hasMany(db.orders); // 使用者可開多的訂單
db.users.hasMany(db.orderedMeals); // 使用者可訂多個餐點
db.restaurants.hasMany(db.meals); // 餐廳有多項餐點
db.restaurants.hasMany(db.orders); // 餐廳有多個訂單
db.meals.hasMany(db.orderedMeals); // 餐點可被多個已訂餐點選擇
db.orders.hasMany(db.orderedMeals); // 訂單有多項已訂餐點

db.meals.belongsTo(db.restaurants); // 每項餐點只屬於一間餐廳
db.orders.belongsTo(db.restaurants); // 每筆訂單只屬於一間餐廳
db.orders.belongsTo(db.users); // 每筆訂單只由一位使用者開團
db.orderedMeals.belongsTo(db.meals); // 已訂餐點只屬於某項餐點
db.orderedMeals.belongsTo(db.orders); // 已訂餐點只屬於某個訂單
db.orderedMeals.belongsTo(db.users); // 已訂餐點只由某位使用者下訂

module.exports = db;