const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    content: {
      type: String,
    },
    profile:{
      type:Schema.Types.ObjectId,
      ref:"profiles",
      require:true,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("post",postSchema);