const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    carName: { type: String,required:true },
    carNumber: {  type: String,required:true },
    carType:{type:String,required:true},
    startDate:{type:String,requied:true},
    endDate:{type:String,required:true},
    origin:{type:String},
    destination:{type:String},
    bookingDate:{type:String},
    bookingTime:{type:String},
    pricePerKm: { type: Number},
    mileage: {type: Number},
    seat:{type:Number},
    image:{type:String},
    bookingId: { type: String },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }

},{timestamps:true})

const bookingModel = mongoose.model('bookings' , bookingSchema)

module.exports = bookingModel