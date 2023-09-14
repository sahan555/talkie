const connectDB = require('./config/db');
const port = 3000;

const express = require('express');
const app = express();

// defining router
const userRoute = require('./routes/userRoute');
const registerLoginRoute = require('./routes/registerLoginModel');
const profileRoute = require('./routes/profileRoute');

app.use(express.json());
connectDB();

// to make public folder static
app.use("/public",express.static(__dirname + "/public"));

//use router by express
app.use(userRoute);
app.use(registerLoginRoute);
app.use(profileRoute);

app.listen(port,()=>{
    console.log(`Server is running ${port}`)
})
