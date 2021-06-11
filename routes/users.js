const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/User');
const { loginValidation, registerValidation } = require('../auth/validation');
const verify = require('./verifytoken');

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch(error) {
        res.json({message: error});
    }
});

// Get a specific user by id
router.get('/:_id', verify, (req, res) => {
    UserModel.findOne({_id: req.params._id}, function(err, user){
        if(err) return res.status(500).json({error: err});
        if(!user) return res.status(404).json({error: 'User was not found'});
        res.json(user);
    })
});

// Update a user by id
router.put('/edit/:_id', (req, res) => {
    UserModel.updateOne({ _id: req.params._id }, { $set: req.body }, function(err, output){
        if(err) res.status(500).json({ error: 'database failure' });
        console.log(output);
        if(!output.n) return res.status(404).json({ error: 'User is not found' });
        res.json( { message: 'User is updated' } );
    });
});

// Add a new user
router.post("/register", async (req, res, next) => {
    let create_object;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if(req.body!==undefined) {
        create_object = req.body;
    }

    create_object.password = hashedPassword;

    UserModel.create(create_object,(err,object)=> {
        if(err) return next(err)
        res.json(object);        
    });
});

// User Login
router.post("/login", async (req, res) => {
    // Validate the data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the username exists
    const user = await UserModel.findOne({username: req.body.username});
    if (!user) return res.status(400).send('Username does not exist');

    // Check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Password is incorrect');

    // Create and assign a JSON Web Token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

// Delete a user by id
router.delete('/:_id', async (req, res) => {
    UserModel.remove({ _id: req.params._id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });

        res.status(204).end();
    });
});

module.exports = router;