const mongoose=require('mongoose');

function connectDB(){

    mongoose.connect('mongodb+srv://ragesh_j:10xacademy@cluster0.ov2ibq8.mongodb.net/RentalCar',{useUnifiedTopology: true , useNewUrlParser: true})
   

    const connection=mongoose.connection;
    connection.on('connected',()=>{
        console.log("Succesfully connected to db...")
    })
    connection.on('error',()=>{
        console.log("Failed connecting to db...")
    })
}
connectDB();
module.exports=mongoose;