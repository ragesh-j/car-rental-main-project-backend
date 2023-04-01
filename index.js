const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.Port || 8000;
const dbConnection = require('./db');
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
dotenv.config()


app.use(express.json());
const User = require("./model/User")
SECRET_KEY = process.env.JWT_SECRET
const adminRoute = require('./routes/admin');
// const carRoutes = require('./routes/car')
const userRoutes = require('./routes/user');
const RegistartionModel = require('./model/registration');
app.use(cors());
app.options('*', cors());


app.use('/admin', adminRoute);

app.use('/user', userRoutes);


// app.use('/api/users/' , require('./routes/usersRoute'))
app.use("/bookings", (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, SECRET_KEY, async (err, decoded) => {

      if (err)
        return res
          .status(403)
          .json({ message: err });
      console.log(decoded)
      req.user = await User.findOne({ _id: decoded.data });

      next();
    });
  } else
    return res
      .status(403)
      .json({ message: "Session expired, please login again" });
});
app.use("/car", (req, res, next) => {
  const token = req.headers.authorization;
  
  if (token) {
    jwt.verify(token, SECRET_KEY, async (err, decoded) => {

      if (err)
        return res
          .status(403)
          .json({ message: err });
      console.log(decoded)
      req.admin = await RegistartionModel.findOne({ _id: decoded.data });

      next();
    });
  } else
    return res
      .status(403)
      .json({ message: "Session expired, please login again" });
});
app.use('/car', require('./routes/carsRoute'))
// app.use('/car', carRoutes);

app.use('/bookings', require('./routes/bookingsRoute'))

app.get('/', (req, res) => {
  res.send("Hello World")
})
app.listen(port, () => console.log(`server is running at ${port}`));