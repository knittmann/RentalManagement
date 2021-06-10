const express = require('express');
const router = express.Router();
const UserModel = require('../model/User');

// Get all users
router.get("/", (req, res) => {
    UserModel.find().then(function(results){
        res.json(results);
    }).catch(function(err){
        return res.status(404).json({err: 'Undefined error!'});
    })
});

// Get a specific user by id
router.get('/:_id', (req, res) => {
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
router.post("/register", (req, res, next) => {
    let create_object;
    if(req.body!==undefined) {
        create_object = req.body;
    }
    UserModel.create(create_object,(err,object)=> {
        if(err) return next(err)
        res.json(object);        
    });
});

// Delete a user by id
router.delete('/:_id', async (req, res) => {
    UserModel.remove({ _id: req.params._id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });

        res.status(204).end();
    });
});

module.exports = router;