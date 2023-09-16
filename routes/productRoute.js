const express = require("express");
const router = express.Router();
const productModel = require("../model/productModel");
const domain = "http://localhost:3000";
// const auth = require("../config/auth.js");
const uploadServices = require("../services/uploadServices");

// @route POST profile/create by taking the ref of the user
// @desc Create a profile
// @access Private
router.post(
  "/product/create",
  uploadServices.productImage.single("productImg"),
  // auth.verifyUser,
  async (req, res) => {
    const data = req.body;
    const file = req.file;
    try {
      const existingProduct = await productModel.findOne({ name: data.name });

      if (existingProduct) {
        return res.status(400).json({ error: "Profile already exists" });
      }
      if (!file || file.length === 0) {
        return res.status(400).send("Please upload an image");
      }
      const image = domain + "/public/product/" + file.filename;
      const product = new productModel({
        name: data.name,
        price: data.price,
        details: data.details,
        stockquantity: data.stockquantity,
        productImg: image,
      });
      await product.save();
      res.status(200).json({ msg: "product created successfully", product });
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
  "/product/update/:id",
  uploadServices.productImage.single("productImg"),
  // auth.verifyUser,
  async (req, res) => {
    const data = req.body;
    const file = req.file;
    try {

      const product = await productModel.findById(req.params.id);
      if (!product) {
        res.status(400).json({ msg: "product not found" });
        return;
      }
      if (!file || file.length === 0) {
        product.name = data.name ? data.name : product.name;
        product.price = data.price ? data.price : product.price;
        product.details = data.details ? data.details : product.details;
        product.stockquantity = data.stockquantity
          ? data.stockquantity
          : product.stockquantity;
        const updatedProduct = await product.save();
        res.json({ msg: "product updated", success: true, updatedProduct });
      } else {
        const image = domain + "/public/product/" + file.filename;
        product.name = data.name ? data.name : product.name;
        product.price = data.price ? data.price : product.price;
        product.details = data.details ? data.details : product.details;
        product.stockquantity = data.stockquantity
          ? data.stockquantity
          : product.stockquantity;
        product.productImg = image ? image : product.productImg;

        const updatedProduct = await product.save();
        res.json({ msg: "product updated", success: true, updatedProduct });
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
router.get(
  "/product/get",
  // auth.verifyUser,
  async (req, res) => {
    try {
      const product = await productModel.find();
      if (!product) {
        return res.status(400).send("product not found");
      }
      res.json({ msg: "product fetched", success: true, product });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);
router.get(
  "/product/get/:id",
  // auth.verifyUser,
  async (req, res) => {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) {
        return res.status(400).send("product not found");
      }
      res.json({ msg: "product fetched", success: true, product });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

// code for delete the profile by taking the ref of the user
// @route DELETE profile/delete
// @desc Delete a profile
// @access Private
router.delete("/product/delete/:id",
//  auth.verifyUser,
 async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "product deleted successfully", success: true, product });
  } catch (err) {
    res.status(500).json({ msg: err.message, success: false });
  }
});
module.exports = router;
