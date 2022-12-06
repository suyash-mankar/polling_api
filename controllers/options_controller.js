const Option = require("../models/option");
const Question = require("../models/question");
const Counter = require("../models/counter");
const { options } = require("../routes/questions");

module.exports.create = async function (req, res) {
  try {
    let question = await Question.findOne({ _id: req.params.id });

    if (question) {
      let counter = await Counter.findOneAndUpdate(
        { id: "optionCounter" },
        { $inc: { seq: 1 } },
        { new: true }
      );

      if (counter === null) {
        counter = await Counter.create({
          id: "optionCounter",
          seq: 1,
        });
      }

      let option = await Option.create({
        _id: counter.seq,
        text: req.body.text,
        link_to_vote: `http://localhost:8000/options/${counter.seq}/add_vote`,
        question: question,
      });

      question.options.push(option);
      question.save();

      return res.status(200).json({
        message: "Option created successfully",
      });
    } else {
      return res.status(404).json({
        message: "Question not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.delete = async function (req, res) {
  try {
    let option = await Option.findOne({ _id: req.params.id });
    let question = await Question.findByIdAndUpdate(option.question, {
      $pull: { options: option },
    });

    if (option.votes === 0) {
      option.remove();
    } else {
      return res.status(200).json({
        message: "Option cant be deleted as it contain votes",
      });
    }

    return res.status(200).json({
      message: "Option deleted successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.addVote = async function (req, res) {
  try {
    let option = await Option.findOne({ _id: req.params.id });
    option.votes = option.votes + 1;
    option.save();

    // update votes in the question model also
    const query = { _id: option.question, "options._id": option._id };
    const updateDocument = {
      $set: { "options.$.votes": option.votes },
    };
    const result = await Question.updateOne(query, updateDocument);

    return res.status(200).json({
      message: "Vote added successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
