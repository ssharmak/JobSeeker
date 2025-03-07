const mongoose = require('mongoose');
const validator = require('validator');

const admin_schema=new mongoose.Schema({
    name:{ type: String },
     email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: validator.isEmail,
                message: "Invalid email address"
            }
        },

    password:{type: String ,required: true }

});

const admin = mongoose.model('admin', admin_schema);

module.exports= admin