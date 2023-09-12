const connectDB = require('./config/db');
const port = 3000;


const express = require('express');
const app = express();
const registerLogin = require('./routes/registerLoginModel');

app.use(express.json());
connectDB();
app.use(registerLogin);
app.listen(port,()=>{
    console.log(`Server is running ${port}`)
})
