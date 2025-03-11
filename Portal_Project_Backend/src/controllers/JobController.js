const Category=require("../models/job_category");
const Job=require("../models/job");

//To get all categories and their job counts
exports.JobCountByCategory=async (req, res) => {
    try {
      const jobCounts = await Job.aggregate([
        {
          $group: {
            _id: "$category", 
            jobCount: { $sum: 1 }, 
          },
        },
        {
          $lookup: {
            from: "categories", 
            localField: "_id",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        {
          $unwind: "$categoryDetails", 
        },
        {
          $project: {
            _id: 0,
            categoryName: "$categoryDetails.CategoryName",
            jobCount: 1,
          },
        },
      ]);
  
      res.status(200).json(jobCounts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching job category counts", error });
    }
  };


//To get all city names
  exports.allCity= async(req,res)=>{
    try{
      const allCities = await Job.distinct("location.city");
    if (allCities.length===0){
      return res.status(404).json({message:" No cities found"});
    }
    res.status(200).json(allCities);
  }
  catch(error){
res.status(500).json({message:"Error fetching cities"});
  }
  };


  //To get all designations ( Since there is no field separately as designation in the database, job title is considered here as designation)
 exports.allDesignations=async(req,res)=>{
  try{
    const allDesignations = await Job.distinct("title");
    if (allDesignations.length===0){
      return res.status(404).json({message:" No Designations found"});
    }
    res.status(200).json(allDesignations);
  }
  catch(error){
res.status(500).json({message:"Error fetching Designations"});
  }

 };
  module.exports = router;


//Job filtering based on query parameters
exports.filterJobs = async (req, res) => {
  try {
    const { city, designation, category } = req.query;

    // Build dynamic filter object
    let filter = {};

    if (city) filter["location.city"] = city;
    if (designation) filter["title"] = designation;

    if (category) {
      const categoryDoc = await Category.findOne({ CategoryName: category });
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }
      filter["category"] = categoryDoc._id;
    }

    // Fetch jobs based on filters
    const jobs = await Job.find(filter, { _id: 0, title: 1, location: 1, category: 1 });

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found matching the criteria" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};


