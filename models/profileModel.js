const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    username: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
    },
    bio: {
      type: String,
    },
    dob: {
      type: Date,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("profile", profileSchema);
