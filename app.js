const connectDB = require('./config/db');
const port = 3000;


const express = require('express');
const app = express();

app.use(express.json());
connectDB();

app.listen(port,()=>{
    console.log(`Server is running ${port}`)
})
