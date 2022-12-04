const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    //crated at and updated at what time/date
    timestamps: true,
  }
);

const Option = mongoose.model("Question", optionSchema);

module.exports = Option;
