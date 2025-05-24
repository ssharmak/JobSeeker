const Category=require("../models/job_category");
const Job=require("../models/job");
const {Candidate}=require("../models/candidates");

//To get all categories and their job counts
const JobCountByCategory=async (req, res) => {
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
 const allCity = async (req, res) => {
  try {
    const allCities = await Job.distinct("location.city");

    if (!allCities || allCities.length === 0) {
      return res.status(404).json({ message: "No cities found" });
    }

    return res.status(200).json({ cities: allCities });
  } catch (error) {
    console.error("Error fetching cities:", error); // Log the actual error for debugging
    return res.status(500).json({ message: "Error fetching cities", error: error.message });
  }
};



  //To get all designations ( Since there is no field separately as designation in the database, job title is considered here as designation)
 const allDesignations=async(req,res)=>{
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
 


//Job filtering based on query parameters
const filterJobs = async (req, res) => {
  try {
    const { city, designation , category,min_salary, experience,employment_type } = req.query;

    // Build dynamic filter object
    let filter = {};

    if (city) filter["location.city"] = city;
    if (designation) filter["title"] = designation;
    if (min_salary) filter["salary_range.min"]= {$gte:Number(min_salary)};
    if(experience) filter["min_experience"]= experience;
    if(employment_type) filter["employment_type"]=employment_type;

    if (category) {
      const categoryDoc = await Category.findOne({ CategoryName: category });
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }
      filter["category"] = categoryDoc._id;

    }
    console.log("Query Params:", req.query);

    console.log("filter",filter);
    // Fetch jobs based on filters
    const jobs = await Job.find(filter,{_id:0, title:1, location:1});

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found matching the criteria" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};


//find jobs by distance
const findJobByDistance = async (req, res) => {
  try {
      const { distance } = req.query; // Distance in km
      const { userId }= req.user?.id;

      // Find Institution by ID
      const candidate = await Candidate.findOne(userId);
      if (!candidate) {
          return res.status(404).json({ message: "candidate not found" });
      }

      // Extract institution coordinates
      const [candidateLon, candidateLat] = [candidate.longitude,candidate.latitude];

      // Fetch all candidates and filter them using the Haversine formula
      const jobs = await Job.find({
          latitude: { $ne: null }, // Ensure valid coordinates exist
          longitude: { $ne: null }
      });

      // Filter candidates within the specified distance
      const filteredJobs = jobs.filter(job => {
          const jobLat = job.latitude;
          const jobLong = job.longitude;
          return haversine(candidateLat, candidateLon, jobLong,jobLat) <= distance;
      });

      res.status(200).json({ jobs: filteredJobs });

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Haversine formula function
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const toRad = angle => (angle * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};


//Job Search 
const jobsearch = async (req, res) => {
  try {
    const { title, location, minExp = 0, maxExp = 50 } = req.query;

    // Build dynamic MongoDB query
    const query = {
      is_active: true,
      status: "open",
    };

    if (title) {
      query.title = { $regex: title, $options: "i" }; // case-insensitive search
    }

    if (location) {
      query.$or = [
        { "address.city": { $regex: location, $options: "i" } },
        { "address.state": { $regex: location, $options: "i" } },
        { "address.country": { $regex: location, $options: "i" } },
      ];
    }

    query.min_experience = { $lte: Number(maxExp) };
    query.max_experience = { $gte: Number(minExp) };

    const jobs = await Job.find(query);
    res.status(200).json(jobs);

  } catch (error) {
    console.error("Job search error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports={ JobCountByCategory,allCity,filterJobs,allDesignations,findJobByDistance,jobsearch }


