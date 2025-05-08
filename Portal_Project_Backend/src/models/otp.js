const mongoose = require('mongoose');
const validator = require('validator');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email address"
        }
    },
    otp: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: 300 },

});

module.exports = mongoose.model('otp', otpSchema);