module.exports.home = function (req, res) {
  console.log("inside home controller");

  return res.render("home");
};
