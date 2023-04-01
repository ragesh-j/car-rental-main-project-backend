const mongoose=require('mongoose');

const carSchema=new mongoose.Schema({
    name:{type:String,required:true},
    model:{type:String,required:true},
    capacity:{type:Number,required:true},
    image:{type:String,required:true},
    type:{type:String,required:true},
    milage:{type:Number,required:true},
    rentPerHour : {type : Number , required : true},
    availableFrom:{type:String},
    availableTill:{type:String},
    carDetails:{type:String,required:true},
    description:{type:String,required:true},
    details:{type:String}
},{timestamps : true})

const carModel = mongoose.model('cars' , carSchema)
module.exports = carModel;