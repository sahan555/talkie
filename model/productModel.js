const mongoose = require("mongoose");
const schema = mongoose.Schema;
const productSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
      unique: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
    },
    stockquantity: {
      type: String,
    },
    productImg: {
      type: String,
    }
    // profilePicture: {
    //   type: String,
    // },
  },
  { timestamps: true }
);
module.exports = mongoose.model("product",productSchema);