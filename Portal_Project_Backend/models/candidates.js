const mongoose=require('mongoose');
const { getNames }=require('country-list');
const validator= require('validator');


const education_schema=new mongoose.Schema({
    degree:{type:String, required:true},
    university:{type:String, required:true},
    year_of_passing:{type:Number,required:true, min:2000,max:new Date().getFullYear()+1}


})

const candidate_schema=new mongoose.Schema({
    full_name:{type:String,required:true},
    email:{type:String,unique:true, match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/,'Please fill a valid email address']},
    phone:{
        type:String,
        required:true,
        unique:true,
        match:[/^\+?[1-9]\d{6,14}$/,"Invalid Phone Number Formsat"]},
        address:{
            street:{type:String},
            city:{type:String},
            state:{type:String},
            postal_code:{type:String},
            country:{type:String,
                enum:getNames(), //Dynamically fetches all country names
                required:true
            }
        },
        skills:{type:[String]},
        experience_years:{type:Number, required:true},
        education:[education_schema],
        resume_url:{
            type:String,
            required:true,
            validate:{
                validator: (value) => validator.isURL(value),
                message: "Please enter a valid resume URL"
            }
        },
        profile_picture:{
            type:String,
            required:true,
            validate:{
                validator: (value) => validator.isURL(value)&& /\.(jpg|jpeg|png|gif)$/,
                message: "Please enter a valid  image URL"
            }
        },
        created_at:{type:Date},
        updated_at:{type:Date}



    }

);