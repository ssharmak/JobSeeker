const mongoose= require('mongoose')

const User_Schema= new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,unique:true, match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/,'Please fill a valid email address']

},
country: {
    type: String,
    required: true,
    trim: true
  },
    password:{type:String,required:true},
    otp_verified:{type:Boolean,required:true,default:false},
    is_verified:{type:Boolean,required:true,default:false},
    last_login:{type:Date,default:Date.now()},
    role:{type:String, default:"user"},
    auth_provider:{type:String,default:"local"}
},{ timestamps:true });


const Users=mongoose.model('users',User_Schema);

module.exports=Users;

