const mongoose= require('mongoose')

const recruiter_details=new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true, match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/,'Please fill a valid email address']}
});

const jobs_schema= new mongoose.Schema({

title:{type: String, required:true},
department:{type: String, required:true},
location:{city:{type:String,required:true},
state:{type:String,required:true},
country:{type:String,required:true},
remote:{type:Boolean,required:true}},
category:{type:mongoose.Schema.Types.ObjectId,ref: "Category",
    default: null,},
employment_type:{type:String,enum:["Full_time","Internship"],required:true},
experience_level:{type:String,enum:["Fresher","Junior","Mid-Senior","Senior"],required:true},
description:{type:String,required:true},
requirements:{type:[String],required:true},
prefered_qualifications:{type:[String],required:true},
responsibilities:{type:[String],required:true},
benefits:{type:[String],required:true},
posted_date:{type:Date,required:true},
closing_date:{type:Date,required:true},
status:{type:String,enum:["open","closed"],required:true},
hiring_manager:{
    name:{type:String,required:true},
    email:{type:String,required:true,match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Please fill a valid email address']},
    department:{type:String,required:true},
},
recruiters:[recruiter_details],
max_applications:{type:Number},
is_active:{type:Boolean},
allow_multiple_applications:{type:Boolean},
salary_range:{
    min:{type:Number},
    max:{type:Number},
    currency:{type:String},
    is_visible_to_applicants:{type:Boolean}
}

}

);

const jobs=mongoose.model('jobs',jobs_schema);

module.exports=jobs;