const mongoose = require("mongoose");
const schema = mongoose.Schema;
const categoriesSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("category",categoriesSchema);