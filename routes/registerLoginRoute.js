const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// router for register
router.post("/user/register", (req, res) => {
  const email = req.body.email;
  try {
    userModel.findOne({ email: email }).then((user_email) => {
      if (user_email != null) {
        res.status(400).json({ msg: "email already exists", success: false });
        return;
      } else {
        const password = req.body.password;
        bcryptjs.hash(password, 10, (e, hashed_pw) => {
          if (e) {
            res.status(500).json({ msg: e, success: false });
            return;
          } else {
            const data = new userModel({
              email: email,
              password: hashed_pw,
            });
            data.save().then((data) => {
              res.json({
                msg: "user registered successfully",
                success: true,
                data,
              });
            });
          }
        });
      }
    });
  } catch (e) {
    res.status(500).json({ msg: e, success: false });
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ msg: "email or password is not correct", success: false });
      return;
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res
        .status(400)
        .json({ msg: "email or password is not correct", success: false });
      return;
    }

    const token = jwt.sign({ _id: user._id }, "neosphere", {
      expiresIn: "30d",
    });

    res.json({ msg: "login successful", success: true, token, data: user });
  } catch (e) {
    res.status(500).json({ msg: e, success: false });
  }
});
module.exports = router;