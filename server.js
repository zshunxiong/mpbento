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

// Vue index route
const path = __dirname + '/app/html/';
app.use(express.static(path));
// For every other path not under /api/*, serve /index.html
app.get(new RegExp('^(?!' + '/api' + '(/|$))'), function (req, res) {
  res.sendFile(path + "index.html");
});

// Api route
require("./app/routes")(app);

// And now a 404 catch all.
app.use(function (req, res, next) {
  res.status(404).send(`Error 404: ${req.method} => ${req.path}`)
})

// And now for any exception.
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Error 500: Internal Server Error')
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});