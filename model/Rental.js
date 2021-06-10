const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema({
        rental_id:{
            type:Number,
            required:true
        },
        receive_date:String,
        receive_hours:String,
        return_date:String,
        return_hours:String,
        rate_type:String,
        equipment:[{
            category:String,
            make:String,
            model:String,
            serial_number:String,
            rate_per_day:String,
            rate_per_week:String,
            rate_per_month:String
        }],
        vendor:{
            sales_person:String,
            address:String,
            contact:String
        },
        invoice:{
            invoice_date:String,
            amount:Number
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('rental', RentalSchema);