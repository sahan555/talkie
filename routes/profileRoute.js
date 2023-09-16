const express = require("express");
const router = express.Router();
const profileModel = require("../model/profileModel");
const domain = "http://localhost:3000";
const auth = require("../config/auth.js");
const uploadServices = require("../services/uploadServices");

// @route POST profile/create by taking the ref of the user
// @desc Create a profile
// @access Private
router.post(
  "/profile/create",
  uploadServices.profileImage.single("profileimage"),
  auth.verifyUser,
  async (req, res) => {
    const data = req.body;
    const file = req.file;
    try {
      const existingProfile = await profileModel.findOne({ user: req.userData._id });

      if (existingProfile) {
        return res.status(400).json({ error: "Profile already exists" });
      }

      if (!file || file.length === 0) {
        return res.status(400).send("Please upload an image");
      }
      const image = domain + "/public/profiles/" + file.filename;
      const profile = new profileModel({
        user: req.userData._id, // req.userData in auth js ma banako xa
        name: data.name,
        contact: data.contact,
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
// @route put profile/update by taking the ref of the user
// @desc update a profile
// @access Private
router.put(
  "/profile/update",
  uploadServices.profileImage.single("profileimage"),
  auth.verifyUser,
  async (req, res) => {
    const data = req.body;
    const file = req.file;
    try {
      const profile = await profileModel.findOne({ user: req.userData._id });
      if (!profile) {
        res.status(400).json({ msg: "profile not found" });
        return;
      }
      if (!file || file.length === 0) {
        profile.name = data.name ? data.name : profile.name;
        profile.contact = data.contact ? data.contact : profile.contact;
        profile.address = data.address ? data.address : profile.address;
        const updatedProfile = await profile.save();
        res.json({ msg: "profile updated", success: true, updatedProfile });
      } else {
        const image = domain + "/public/profiles/" + file.filename;
        profile.name = data.name ? data.name : profile.name;
        profile.profileimage = image ? image : profile.profileimage;
        profile.contact = data.contact ? data.contact : profile.contact;
        profile.address = data.address ? data.address : profile.address;
        profile.dob = data.dob ? data.dob : profile.dob;

        const updatedProfile = await profile.save();
        res.json({ msg: "Profile updated", success: true, updatedProfile });
      }
    } catch (e) {
      res.status(500).json({ msg: e.message, success: false });
    }
  }
);
// code for get the profile by taking the ref of the user
// @route GET profile/get
// @desc Get a profile
// @access Private
router.get("/profile/get", auth.verifyUser, async (req, res) => {
  try {
    const profile = await profileModel.findOne({ user: req.userData._id });
    if (!profile) {
      return res.status(400).send("Profile not found");
    }
    res.json({ msg: "profile fetched", success: true, profile });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// code for delete the profile by taking the ref of the user
// @route DELETE profile/delete
// @desc Delete a profile
// @access Private
router.delete("/profile/delete", auth.verifyUser, async (req, res) => {
  try {
    const profile = await profileModel.findOne({ user: req.userData._id });
    if (!profile) {
      return res.status(400).send("Profile not found");
    }
    await profile.deleteOne;
    res.json({ msg: "profile deleted", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
