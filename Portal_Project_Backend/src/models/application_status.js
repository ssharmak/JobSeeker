const mongoose = require('mongoose');

const appSchema= new mongoose.Schema({
    id:{type:String, required:true},
    latest_status:{type:String, required:true},
    rejection_counts:{type:Number,default:0},
    Admin_comments:{type:[String]},


},{ timestamps: true });


const Status = mongoose.model('Approval_Status', appSchema);

module.exports = Status;