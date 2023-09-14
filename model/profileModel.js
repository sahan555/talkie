const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const profileSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"users",
        },
        name:{
            type:String,
            required:true,
        },
        profileimage:{
            type:String,
        },
        contact:{
            type:String,
        },
        address:{
            type:String,
        },
        dob:{
            type:Date,
        }
    },
    {timestamps:true}
);
module.exports =mongoose.model("profile",profileSchema);