const connectDB = require('./config/db');
const port = 5000;

const express = require('express');
const app = express();
const cors = require('cors');
// defining router
const userRoute = require('./routes/userRoute');
const registerLoginRoute = require('./routes/registerLoginRoute');
const profileRoute = require('./routes/profileRoute');
const postRoute = require('./routes/postRoute');
app.use(cors());

app.use(express.json());
connectDB();

// to make public folder static
app.use("/public",express.static(__dirname + "/public"));

//use router by express
app.use(userRoute);
app.use(registerLoginRoute);
app.use(profileRoute);
app.use(postRoute);


app.listen(port,()=>{
    console.log(`Server is running ${port}`)
})
