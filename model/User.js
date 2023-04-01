const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact:{
        type: Number,
        required: true
    },
    selected:{
        type: Schema.Types.ObjectId,
        ref: 'proposals',
        default: null
    },
    posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'bookings'
        }
      ]
}, {timestamps: true});

const User = mongoose.model('users', userSchema);
module.exports = User;
    