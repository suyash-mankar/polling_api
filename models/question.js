const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
