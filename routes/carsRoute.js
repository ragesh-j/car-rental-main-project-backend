const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addcar", async (req, res) => {
  
  try {
    const newcar = new Car(req.body);
    await newcar.save();
    res.send("Car added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.put("/editcar", async (req, res) => {
  
  try {
    const car = await Car.findOne({ _id: req.body.id });
    car.name = req.body.name;
    car.image = req.body.image;
    car.type = req.body.type;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;
    car.availableFrom=req.body.availableFrom;
    car.availableTill=req.body.availableTill;
    car.carDetails=req.body.carDetails;
    car.description=req.body.description;
    car.details=req.body.details;
    car.milage=req.body.milage;
    car.model=req.body.model;

    await car.save();

    res.send("Car details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.delete("/deletecar", async (req, res) => {
  
  try {
    await Car.findOneAndDelete({ _id: req.body.id });

    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
