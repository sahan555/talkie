const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    content: {
      type: String,
    },
    user:{
      type:Schema.Types.ObjectId,
      ref:"user",
      require:true,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("post",postSchema);