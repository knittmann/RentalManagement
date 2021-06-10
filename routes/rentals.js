const express = require('express');
const router = express.Router();
const RentalModel = require('../model/Rental');


// GET ALL
router.get('/', (req,res)=>{
    RentalModel.find().then(function(results){
        res.json(results);
    }).catch(function(err){
        return res.status(404).json({err: 'Undefined error!'});
    })
})

// GET BY RENTAL_ID
router.get('/:_id', (req,res)=>{
    RentalModel.findOne({_id: req.params.l_id}, function(err, rental){
        // console.log(req.params.rental_id);
        if(err) return res.status(500).json({error: err});
        if(!rental) return res.status(404).json({error: 'rental was not found'});
        res.json(rental);
    })
});
    
// POST
router.post("/new", (req,res, next)=>{
    let create_object;
    if(req.body!==undefined) {
        create_object = req.body;
    }
    RentalModel.create(create_object,(err,object)=> {
        if(err) return next(err)
        res.json(object);        
    });
});

// UPDATE 
router.put("/:_id",(req,res)=>{
    RentalModel.updateOne({ _id: req.params._id }, { $set: req.body }, function(err, output){
        if(err) res.status(500).json({ error: 'database failure' });
        console.log(output);
        if(!output.n) return res.status(404).json({ error: 'Rental is not found' });
        res.json( { message: 'Rental is updated' } );
    });
});

// DELETE
router.delete("/:_id",(req,res)=>{
    RentalModel.remove({ _id: req.params._id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });

        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        if(!output.result.n) return res.status(404).json({ error: "rental is not found" });
        res.json({ message: "rental is deleted" });
        */

        res.status(204).end();
    });
});

module.exports = router;