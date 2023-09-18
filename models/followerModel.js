const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const followSchema = new Schema(
  {
    followersser:{
      type:Schema.Types.ObjectId,
      ref:"profiles",
      require:true,
    },
    followinguser:{
      type:Schema.Types.ObjectId,
      ref:"profiles",
      require:true,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("follow",followSchema);