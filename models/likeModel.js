const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const likeSchema = new Schema(
  {
    user:{
      type:Schema.Types.ObjectId,
      ref:"users",
      require:true,
    },
    post:{
      type:Schema.Types.ObjectId,
      ref:"posts",
      require:true,
    },
    likedate:{
        type:Date
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("like",likeSchema);