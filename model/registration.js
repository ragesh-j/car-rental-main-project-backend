const mongoose = require('mongoose')

const RegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })


const RegistartionModel = mongoose.model('admins', RegistrationSchema)
module.exports = RegistartionModel