const Option = require("../models/option");
const Question = require("../models/question");
const Counter = require("../models/counter");

// create option
module.exports.create = async function (req, res) {
  try {
    // find the question
    let question = await Question.findOne({ _id: req.params.id });

    if (question) {
      // find and update the counter
      let counter = await Counter.findOneAndUpdate(
        { id: "optionCounter" },
        { $inc: { seq: 1 } },
        { new: true }
      );

      // id counter is null, set the initial values
      if (counter === null) {
        counter = await Counter.create({
          id: "optionCounter",
          seq: 1,
        });
      }

      // create option with id as counter sequence
      let option = await Option.create({
        _id: counter.seq,
        text: req.body.text,
        link_to_vote: `http://localhost:8000/options/${counter.seq}/add_vote`,
        question: question,
      });

      // add the option in the question model also
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

// delete option
module.exports.delete = async function (req, res) {
  try {
    // find the option
    let option = await Option.findOne({ _id: req.params.id });

    // if the option has no votes
    if (option.votes === 0) {
      // delete the option from the question model
      let question = await Question.findByIdAndUpdate(option.question, {
        $pull: { options: option },
      });
      // delete the option
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

// add vote to an option
module.exports.addVote = async function (req, res) {
  try {
    // find the option
    let option = await Option.findOne({ _id: req.params.id });
    // add vote
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
