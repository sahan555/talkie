const express = require("express");
const router = express.Router();
const Profile = require("../model/profileModel");
const domain = "http://localhost:3000";
const auth = require("../config/auth.js");
const uploadServices = require("../services/uploadServices");

// @route POST profile/create by taking the ref of the user
// @desc Create a profile
// @access Private
router.post("/profile/create",  uploadServices.profileImage.single("profileimage"),
  auth.verifyUser,  async (req, res) => {
    const data = req.body;
    const file = req.file;
    try {
      if (!file || file.length === 0) {
        return res.status(400).send("Please upload an image");
      }
      const image = domain + "/public/profiles/" + file.filename;
      const profile = new Profile({
        user: req.userData._id, // req.userData in auth js ma banako xa
        name: data.name,
        contact: data.address,
        address: data.address,
        dob: data.dob,
        profileimage: image,
      });
      await profile.save();
      res.status(200).json({ msg: "Profile created successfully", profile });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
