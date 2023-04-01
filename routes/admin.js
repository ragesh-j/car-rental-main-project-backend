const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const RegistrationModel = require('../model/registration')
const router = require('express').Router()
SECRET_KEY = process.env.JWT_SECRET

router.post('/registration', async (req, resp) => {

    try {
        const existingAdmin = await RegistrationModel.findOne({ email: req.body.email })
        if (existingAdmin) {
            return resp.status(200).send({ success: false, message: 'Admin Credentials already exist' })
        }
        else {
            const password = req.body.password
            const saltRounds = 10
            const saltCode = await bcrypt.genSalt(saltRounds)
            const hashedPassword = await bcrypt.hash(password, saltCode)
            req.body.password = hashedPassword

            const newAdmin = new RegistrationModel(req.body)
            const newAdminData = await newAdmin.save()
            console.log(newAdminData)
            return resp.status(200).send({ success: true, message: 'Account Created Sucessfully' })
        }
    }
    catch (err) {
        console.log(err)
    }
})


router.post('/signin', async (req, resp) => {
    try {
        const admin = await RegistrationModel.findOne({ contact: req.body.contact })
        if (admin) {
            const matchPassword = await bcrypt.compare(req.body.password, admin.password)

            if (matchPassword) {
                const dataToBeSentToFrontEnd = {
                    _id: admin._id
                }
                //jwt.sign(payload, secretKey, expiryTime)
                const token = jwt.sign(dataToBeSentToFrontEnd, SECRET_KEY, { expiresIn: '1d'})
                
                resp.status(200).json({ success: true, message: 'LogIn Successful', data: { token, name: admin.name } })
            }
            else {
                resp.status(200).send({ success: false, message: 'Incorrect Password' })
            }
        }

        else {
            resp.status(200).send({ success: false, message: 'admin Not Registered' })
        }
    }
    catch (err) {
        resp.status(400).send(err)
    }
})


module.exports = router