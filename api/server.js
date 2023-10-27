const express = require("express");
const db = require("./config/db");
const routes = require("./routes");
const models = require("./models/index");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/", routes);

db.sync({ force: false })
  .then(function () {
    app.listen(3001, () =>
      console.log("Servidor escuchando en el puerto 3001")
    );
  })
  .catch(console.error);
