const express = require('express');
const router = express.Router();
const RentalModel = require('../model/Rental');


// GET ALL
router.get('/rental',(req,res)=>{
    RentalModel.find().then(function(results){
        res.json(results);
    }).catch(function(err){
        return res.status(404).json({err: 'Undefined error!'});
    })
})

// GET BY RENTAL_ID
router.get('/rental/:rental_id',(req,res)=>{
    RentalModel.findOne({rental_id: req.params.rental_id}, function(err, rental){
        // console.log(req.params.rental_id);
        if(err) return res.status(500).json({error: err});
        if(!rental) return res.status(404).json({error: 'rental was not found'});
        res.json(rental);
    })
});
    
// POST
router.post("/rental",(req,res)=>{
    let rental = new RentalModel();
    
    // Store  rental data
    rental.rental_id = req.body.rental_id;
    rental.receive_date = req.body.receive_date;
    rental.receive_hours = req.body.receive_hours;
    rental.return_date = req.body.return_date;
    rental.return_hours = req.body.return_hours;
    rental.rate_type = req.body.rate_type;
    
    // Store equipment data 
    rental.equipment.category = req.body.equipment[0].category;
    rental.equipment.make = req.body.equipment[0].make;
    rental.equipment.model = req.body.equipment[0].model;
    rental.equipment.serial_number = req.body.equipment[0].serial_number;
    rental.equipment.rate_per_day = req.body.equipment[0].rate_per_day;
    rental.equipment.rate_per_week = req.body.equipment[0].rate_per_week;
    rental.equipment.rate_per_month = req.body.equipment[0].rate_per_month;
    
    // Store vendor data
    rental.vendor.sales_person = req.body.vendor.sales_person;
    rental.vendor.address = req.body.vendor.address;
    rental.vendor.contact = req.body.vendor.contact;
    
    // Store invoice data
    rental.invoice.invoice_date = req.body.invoice.invoice_date;
    rental.invoice.amount = req.body.invoice.amount;

    console.log(req.body.equipment[0].rate_per_month);
    console.log(rental.equipment.rate_per_month);

    rental.save((err)=>{
        if(err){
            console.log(err);
            res.json({result:0});
            return;
        }
        // res.json({result:1});
        console.log(rental.equipment.rate_per_month);
        res.json(rental);
    });
})

// UPDATE 
router.put("/rental/:rental_id",(req,res)=>{
    RentalModel.updateOne({ rental_id: req.params.rental_id }, { $set: req.body }, function(err, output){
        if(err) res.status(500).json({ error: 'database failure' });
        console.log(output);
        if(!output.n) return res.status(404).json({ error: 'Rental is not found' });
        res.json( { message: 'Rental is updated' } );
    });
});

// DELETE
router.delete("/rental/:rental_id",(req,res)=>{
    RentalModel.remove({ rental_id: req.params.rental_id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });

        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        if(!output.result.n) return res.status(404).json({ error: "rental is not found" });
        res.json({ message: "rental is deleted" });
        */

        res.status(204).end();
    });
});

module.exports = router;