const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://suyashmankar:${process.env.MONGODB_ATLAS_PASS}@cluster0.di1mgma.mongodb.net/?retryWrites=true&w=majority`
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, " Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to database :: MongoDB");
});

module.exports = db;
