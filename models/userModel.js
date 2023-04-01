const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     username : {type:String , required: true},
     password : {type:String , required: true},
     email:{type:String},
     mobile:{type:Number}
     
})

const userModel = mongoose.model('Users' , userSchema)
