const Counter = require("../models/counter");
const Question = require("../models/question");
const Option = require("../models/option");

// create question
module.exports.create = async function (req, res) {
  try {
    // find and update the counter
    let counter = await Counter.findOneAndUpdate(
      { id: "questionCounter" },
      { $inc: { seq: 1 } },
      { new: true }
    );

    // id counter is null, set the initial values
    if (counter === null) {
      counter = await Counter.create({
        id: "questionCounter",
        seq: 1,
      });
    }

    // create question with id as counter sequence
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

// delete question
module.exports.delete = async function (req, res) {
  try {
    // find the question
    let question = await Question.findById(req.params.id);

    let canDeleteQuestion = true;

    // to check if the question has any options that has votes
    question.options.forEach((option) => {
      if (option.votes !== 0) {
        canDeleteQuestion = false;
      }
    });

    // if the question's options has no votes and can be deleted
    if (canDeleteQuestion) {
      // delete the options of the questions
      let option = await Option.deleteMany({ question: question._id });
      // delete the question
      question.remove();
      return res.status(200).json({
        message: "Question Deleted Successfully",
      });
    } else {
      // if the question's options has any votes
      return res.status(200).json({
        message:
          "Question can't be deleted as one of its options contain votes",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// view the question
module.exports.view = async function (req, res) {
  try {
    // find the question
    let question = await Question.findById(req.params.id);

    return res.status(200).json({
      question: question,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
