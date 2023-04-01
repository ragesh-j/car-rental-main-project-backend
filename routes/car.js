// const router = require('express').Router();
// const Car = require('../models/carModel');
// const fetchAdmin = require('../middleware/adminAuth');
// const fetchUser = require('../middleware/fetchUser');
// const {upload, resizeImage} = require('../middleware/uploadImages');

// //ROUTE 1: Creating a new Car;(only for admin and login required)
// router.post("/",fetchAdmin, upload.array('images'), async(req,res) => {
//     try{
//         console.log(req.body);
//         let imageUrlList = [];
  
//         for (let i = 0; i < req.files.length; i++) {
//             let locaFilePath = req.files[i].path;
//             // Upload the local image to Cloudinary
//             // and get image url as response
//             const result = await resizeImage(locaFilePath)
//             imageUrlList.push(result.url);
//         }

//         const car = await Car.create({
//             ...req.body,
//             admin : req.admin,
//             images: imageUrlList
//         });
        
//         res.status(201).json({
//             status: true,
//             car
//         })
//     } catch(e) {
//         res.status(500).json({
//             status: false,
//             message:e.message
//         })
//     }
// });

// //Route 2 : get all the cars of a particular admin(only for admin and login required)
// router.get('/',fetchAdmin ,async(req, res)=>{
//     const {search, attribute} = req.query;
//     try {
//         let cars;
//         if(search){
//             cars = await Car.find({admin: req.admin, [attribute]:{$regex: search, $options:'-i'}}).populate('admin');
//         }else{
//             cars = await Car.find({admin: req.admin}).populate('admin');
//         }
//         return res.status(200).json({
//             status: true,
//             cars
//         })
//     } catch(e) {
//         return res.status(500).json({
//             status: false,
//             message:e.message
//         })
//     }

// })

// //Route 3 : Getting all the cars (only for users and login required)
// router.get('/all', fetchUser , async(req, res)=>{

//     const {search, attribute, page=1} = req.query;
//     try{
//         let cars;
//         if(search){
//             cars = await Car.find({[attribute]:{$regex: search, $options:'-i'}}).populate('admin').skip((page-1)*10).limit(10);
//         }else{
//             cars = await Car.find().populate('admin').skip((page-1)*10).limit(10);
//         }
//         res.status(200).json({
//             status: true,
//             cars
//         })
//     } catch(e) {
//         return res.status(500).json({
//             status: false,
//             message:e.message
//         })
//     }
// } )

// //Route 4 ; to delete a car (only admin can access)
// router.delete('/:_id',fetchAdmin ,async(req, res)=>{
//     const {_id} = req.params;
//     try{
//         const car = await Car.findOne({_id});
//         if(car.admin.toString() !== req.admin){
//             return res.status(401).json({
//                 status:'failure',
//                 message: "you can't delete others cars"
//             })
//         }
//         const resp = await Car.deleteOne({_id});
//         return res.status(200).json({
//             status: true,
//             message: 'Car deleted successfully',
//             resp
//         })
//     } catch(e) {
//         return res.status(500).json({
//             status: false,
//             message:e.message
//         })
//     }
// })

// //Route 5 : to update a car (only admin can access)

// router.put('/:_id', fetchAdmin,async(req, res)=>{
//     const {_id} = req.params;
//     try{
//         const car= await Car.findOne({_id});
//         if(car.admin.toString() !== req.admin){
//             return res.status(401).json({
//                 status:false,
//                 message: "you can't edit others car"
//             })
//         }
//         const resp = await Car.updateOne({_id}, {$set: req.body});
//         return res.status(200).json({
//             status: true,
//             message: 'Car updated successfully',
//             resp
//         })

//     }catch(e) {
//         return res.status(500).json({
//             status: false,
//             message:e.message
//         })
//     }
// })

// module.exports = router;