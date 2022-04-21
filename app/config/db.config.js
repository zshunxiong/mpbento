module.exports = {
  HOST: "us-cdbr-east-05.cleardb.net",
  USER: "bf189e07b01a37",
  PASSWORD: "3b86c97a",
  DB: "heroku_112ffe1e4fa42cd",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};