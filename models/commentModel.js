const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema(
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
    content:{
        type:String
    },
    commentdate:{
        type:Date
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("comment",commentSchema);