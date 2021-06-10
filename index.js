const express = require('express');
const server = express();
const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});

server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(express.static(__dirname+"/templates/css"));


//IMPORT ROUTE
const rentalRoute = require('./routes/rentals');

//INIT ROUTE
server.use('/api/rentals/', rentalRoute);

// server.get('/',(req,res)=>{
//     console.log("hi");
//     res.send("hi");
// })

//MongDB Connection, Start Server
server.listen(3000,(err)=>{
    if (err) {
        return console.log(err);
    } else {
        mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Connected to database successfully");
            }
        })
    }
});