const mongoose= require('mongoose')

const User_Schema= new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,unique:true, match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/,'Please fill a valid email address']

},
    password_hash:{type:String,match:[/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,'Password must contain atleast one letter, one number and one special charector']},
    created_at:{type:Date},
    updated_at:{type:Date},
    is_verified:{type:Boolean,required:true},
    last_login:{type:Date},
    roles:{type:[String]},
    auth_provider:{type:String}
});


const users=mongoose.model('users',users);

module.exports=users;

