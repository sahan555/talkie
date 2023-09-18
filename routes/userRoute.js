const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

// api to save user data
router.post("/user/savedata", (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({ msg: "Data not found" });
    return;
  }
  const user = new userModel({
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
  });

  user
    .save()
    .then((data) => {
      console.log(data);
      res.json({ msg: "Data inserted", success: true, data });
    })
    .catch((error) => {
      res.status(500).json({ msg: error, success: false });
    });
});

// api to get all user data
router.get("/user/getdata", (req, res) => {
    userModel
    .find()
    .then((data) => {
        console.log(data);
      res.json({ msg: "Data fetched", success: true, data });
    })
    .catch((err) => {
      res.status(500).json({ msg: err, success: false });
    });
});
router.get("/user/getdata/:id", (req, res) => {
    userModel.findById(req.params.id)
    .find()
    .then((data) => {
        res.json({ msg: "Data fetched", success: true, data });
        console.log(data);
    })
    .catch((err) => {
      res.status(500).json({ msg: err, success: false });
    });
});

//async method to get
router.get('/user/async/getdata', async (req,res)=>{
    try{
        const user = await userModel.find();
        res.json({msg:'data fetched successguly',success:true,user})
    }catch(e){
        res.status(500).json({msg:e.message,success:false});
    }
});
router.get('/user/async/getdata/:id', async (req,res)=>{
    try{
        const user = await userModel.findById(req.params.id);
        res.json( {msg:'data fetched successguly',success:true,user})
    }catch(e){
        res.status(500).json({msg:e.message,success:false});
    }
});

router.put('/user/async/update/:id',async (req,res) =>{
    const data = req.body;
    const user = await userModel.findById(req.params.id);
    if(!data){
        res.status(400).json({msg:"data not found"});
        return;
    }
    if(!user){
        res.status(400).json({msg:"user not found"});
        return;
    }
    try{
        user.name = data.name ? data.name : user.name;
        user.email = data.email ? data.email : user.email;
        user.password = data.password ? data.password : user.password;
        user.role = data.role ? data.role : user.role;
        const updatedUser = await user.save();
        res.json({msg:"Data updated",success:true,updatedUser});
    }catch(e){
        res.status(500).json({msg:e.message,success:false});
    }
});

router.delete("/user/deletedatas/:id", async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "data deleted successfully", success: true, user });
  } catch (err) {
    res.status(500).json({ msg: err.message, success: false });
  }
});

module.exports = router;
