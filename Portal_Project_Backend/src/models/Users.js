const mongoose= require('mongoose')

const User_Schema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true, match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/,'Please fill a valid email address']

},
country: {
    type: String,
    default:"India",
    trim: true
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+?[1-9]\d{6,14}$/, "Invalid phone number format"]},
    password:{type:String},
    resume: {
      type: String, // Stores file path as a string
    },
    otp_verified:{type:Boolean,required:true,default:false},
    is_verified:{type:Boolean,required:true,default:false},
    last_login:{type:Date,default:Date.now()},
    role:{type:String, default:"user"},
    ptoken:{type:String},
    auth_provider:{type:String,default:"local"}
},{ timestamps:true });


const Users=mongoose.model('users',User_Schema);

module.exports=Users;

