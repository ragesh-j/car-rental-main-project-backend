const express = require("express");
const router = express.Router();
const bookings = require("../models/bookingModel");
const Car = require("../models/carModel");
const User=require("../model/User")
const app=express()
app.use(express.json())

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get('/getallbookings', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('posts');
    const posts = user.posts;
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


router.post('/addbooking', async (req, res) => {

  const { 
    startingDay,
    endingDay,
    carType,
    carName,
    seat,
    mileage,
    rupeesPerKm,
    carNumber,
    bookingId,
    currentDate,
    currentTime,
    image
   } = req.body;

  try {
    const newPost = new bookings({
    carName:carName,
    carNumber:carNumber ,
    carType:carType,
    startDate:startingDay,
    endDate:endingDay,
    pricePerKm: rupeesPerKm,
    mileage:mileage,
    seat:seat,
    bookingId:bookingId,
    bookingDate:currentDate,
    bookingTime:currentTime,
    image:image,
    author: req.user._id
    });

    await newPost.save();

    // Add the new post to the user's `posts` field
    req.user.posts.push(newPost);
    await req.user.save();

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
router.delete('/deletebooking', async (req, res) => {
  const { _id } = req.body;
  

  try {
    // Remove the post with the given ID from the bookings collection
    await bookings.findByIdAndDelete(_id);

    // Remove the post with the given ID from the user's `posts` field
    await User.findByIdAndUpdate(req.user._id, { $pull: { posts: _id } });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;


