const express = require("express");
const app = express();
const port = 8000;

const bodyParser = require("body-parser");
const db = require("./config/mongoose");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("server started on port ", port);
});
