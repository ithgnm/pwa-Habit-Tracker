const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 6
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 6
    },

    displayName: {
        type: String,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }

}, { timestamps: true, })

const User = mongoose.model('user', userSchema);

module.exports = User;