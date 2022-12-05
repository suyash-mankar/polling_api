const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  options: [
    {
      type: mongoose.Schema.Types.Mixed,
      ref: "Option",
    },
  ],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
