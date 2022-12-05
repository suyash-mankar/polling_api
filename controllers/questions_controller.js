const Counter = require("../models/counter");
const Question = require("../models/question");
const Option = require("../models/option");

module.exports.create = async function (req, res) {
  try {
    let counter = await Counter.findOneAndUpdate(
      { id: "questionCounter" },
      { $inc: { seq: 1 } },
      { new: true }
    );

    if (counter === null) {
      counter = await Counter.create({
        id: "questionCounter",
        seq: 1,
      });
    }

    await Question.create({
      _id: counter.seq,
      title: req.body.title,
    });

    return res.status(200).json({
      message: "Question created successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.delete = async function (req, res) {
  try {
    let question = await Question.findById(req.params.id);
    let option = await Option.deleteMany({ question: question._id });
    question.remove();

    return res.status(200).json({
      message: "Question deleted successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
