const Option = require("../models/option");
const Counter = require("../models/counter");

module.exports.create = async function (req, res) {
  try {
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
    });

    return res.status(200).json({
      message: "Option created successfully",
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
    await Option.deleteOne({ _id: req.params.id });

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
