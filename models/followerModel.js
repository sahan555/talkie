const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const followSchema = new Schema(
  {
    follow:{
      type:Schema.Types.ObjectId,
      ref:"user",
      require:true,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("follow",followSchema);