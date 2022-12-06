// create a counter model to track the id sequence

const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    seq: {
      type: Number,
      requied: true,
    },
  },
  {
    timestamps: true,
  }
);

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
