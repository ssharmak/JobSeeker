
const mongoose = require('mongoose');

const helpSchema = new mongoose.Schema({
  

  contact: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true
  }

}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const  Help= mongoose.model('Help', helpSchema);
module.exports=Help;