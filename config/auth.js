const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//guard
const verifyUser = function (req, res, next) {
  try {
    //we have to receive the token first from client..
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "neosphere");

    console.log(data);
    console.log(data._id);

    userModel.findOne({ _id: data._id })
      .then(function (user) {
        //all the data of the logged in user is stored in user
        console.log(user);
        req.userData = user;
        next();
      })
      .catch(function (e) {
        res.status(401).json({ msg: "You are authorised " });
      });
  } catch (e) {
    res.status(401).json({ msg: "You are not authorised" });
  }
};

module.exports = { verifyUser };