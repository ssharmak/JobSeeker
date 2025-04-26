
const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
  

  content: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const  aboutUs= mongoose.model('aboutus', aboutUsSchema);
module.exports=aboutUs;