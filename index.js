const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({exxtended:true}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname,"templates")));

const PORT = process.env.PORT || 3000 ;

app.listen(PORT,()=> {
        console.log(`Server is running at port: ${PORT}!`)
});


const mongoose = require('mongoose');
const { get } = require('http');
const { kStringMaxLength } = require('buffer');

mongoose.connect('mongodb://localhost:27017/rental',{useNewUrlParser:true})
    .then(()=>{console.log("You are now connect to database!")})
    .catch((err)=>console.log(err));

const UserSchema = new mongoose.Schema({
    user_id:Number,
    first_name:String,
    last_name:String,
    email:String,
    password:String,
    role:String
});

User = mongoose.model('User',UserSchema);
let newUser = new User();

newUser.save(function(error,data){
    if(error){
        console.log(error);
    }else{
        console.log('saved');
    }
});