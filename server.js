const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require('dotenv').config();

// Request & Response
const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB 
const db = require("./app/models");
// 強制重置的指令
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.sequelize.sync();

// Api route
require("./app/routes")(app);

// Vue index route
const path = __dirname + '/app/html/';
app.use(express.static(path));
app.all('*', (req, res) => {
  res.sendFile(path + "index.html");
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});