
const Terms = require("../models/terms_and_conditions");
const aboutUs=require("../models/self_information");
const Help=require("../models/help");



const termss=async(req,res)=>{
    try{
    const t=await Terms.find({isActive:true}).sort({version:-1}).limit(1).select('content -_id');

    return res.status(200).json({terms:t});
    }
    catch{
    res.status(404).json({message:"Colud not find the resource"});
    }


}

const createTerm= async(req,res)=>{
    try{
    const {t,version}=req.body;
    const newterm={
        title:"Terms and Conditions",
        version:version,
        isActive:true,
        content:t
    };
    const Termss=new Terms(newterm);
    await Termss.save();
    return res.status(200).json({message:"Saved Successfully"});
}
catch{
    res.status(401).json({message:"Server Error"});
}
};


const abUs=async(req,res)=>{
    try{
    const a=await aboutUs.find({}).select('content -_id');

    return res.status(200).json({content:a});
    }
    catch{
    res.status(404).json({message:"Colud not find the resource"});
    }


}

const createinfo= async(req,res)=>{
    try{
    const {a}=req.body;
    const newab={
        content:a
    };
    const abu=new aboutUs(newab);
    await abu.save();
    return res.status(200).json({message:"Saved Successfully"});
}
catch{
    res.status(401).json({message:"Server Error"});
}
};


const createHelp= async(req,res)=>{
    try{
    const {contact,email}=req.body;
    const newHelp={
        contact:contact,
        email:email
    };
    const H=new Help(newHelp);
    await H.save();
    return res.status(200).json({message:"Saved Successfully"});
}
catch{
    res.status(401).json({message:"Server Error"});
}
};


const Helpp=async(req,res)=>{
    try{
    const h=await Help.find({}).select('contact email -_id');

    return res.status(200).json({content:h});
    }
    catch{
    res.status(404).json({message:"Colud not find the resource"});
    }


}
module.exports={termss,createTerm,abUs,createinfo,createHelp,Helpp};

