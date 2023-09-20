const express = require("express");
const router = express.Router();
const postModel = require("../models/postModel");
const domain = "http://localhost:3000";
const auth = require("../config/auth.js");
const uploadServices = require("../services/uploadServices");

// @route POST profile/create by taking the ref of the user
// @desc Create a profile
// @access Private
router.post(
  "/user/post/create",
  uploadServices.postImage.single("content"),
  auth.verifyUser,
  async (req, res) => {
    const file = req.file;
    try {
      if (!file || file.length === 0) {
        return res.status(400).send("Please upload an image");
      }
      const image = domain + "/public/post/" + file.filename;
      const post = new postModel({
        user: req.userData._id, // req.userData in auth js ma banako xa
        content: image,
      });
      await post.save();
      res.status(200).json({ msg: "post created successfully", post });
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
  "/user/post/update",
  uploadServices.profileImage.single("content"),
  auth.verifyUser,
  async (req, res) => {
    const file = req.file;
    try {
      const post = await postModel.findOne({ user: req.userData._id });
      if (!post) {
        res.status(400).json({ msg: "post not found" });
        return;
      }
      if (!file || file.length === 0) {
        const updatedPost = await post.save();
        res.json({ msg: "post updated", success: true, updatedPost });
      } 
      else {
        const image = domain + "/public/post/" + file.filename;
        post.content = image ? image : post.content;
        const updatedPost = await post.save();
        res.json({ msg: "post updated", success: true, updatedPost });
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
router.get("/user/post/get", auth.verifyUser, async (req, res) => {
  try {
    const post = await postModel.findOne({ user: req.userData._id });
    if (!post) {
      return res.status(400).send("post not found");
    }
    res.json({ msg: "post fetched", success: true, post });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// code for delete the profile by taking the ref of the user
// @route DELETE profile/delete
// @desc Delete a profile
// @access Private
router.delete("/user/post/delete", auth.verifyUser, async (req, res) => {
  try {
    const post = await postModel.findOne({ user: req.userData._id });
    if (!post) {
      return res.status(400).send("post not found");
    }
    await post.deleteOne;
    res.json({ msg: "post deleted", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
