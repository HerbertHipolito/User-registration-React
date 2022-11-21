require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/dbconfig');

app.options('/user/delete/:id', cors()) // it is necessary to active the delete request.

app.use((req,res,next)=>{
    //res.header('Access-Control-Allow-Origin','*');
    //res.header('Access-Control-Allow-Headers','*');
    res.header('Access-Control-Allow-Origin',"http://localhost:3000")
    res.header('Access-Control-Allow-Headers','*');
    cors();
    next()
})


const PORT = process.env.PORT || 3500;
const connection = connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user',require('./routes/user'));

mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
