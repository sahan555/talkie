const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
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
    },
    category:{
      type:Schema.type.ObjectId,
      ref:"category",
      require:true,
    }
    // profilePicture: {
    //   type: String,
    // },
  },
  { timestamps: true }
);
module.exports = mongoose.model("product",productSchema);