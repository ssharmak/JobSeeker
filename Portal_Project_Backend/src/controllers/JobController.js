const Category=require("../models/job_category");
const Job=require("../models/job");

exports.JobFilter=async (req, res) => {
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

  exports.jobByCity = async (req, res) => {
    try {
      const { city_name } = req.body; 
  
      // Aggregation to group jobs by city and show job titles for each city
      const jobs = await Job.aggregate([
        {
          $match: { "location.city": city_name } 
        },
        {
          $group: {
            _id: "$location.city", 
            jobTitles: { $push: "$title" }
          }
        }
      ]);
  
      if (jobs.length === 0) {
        return res.status(404).json({ message: "No jobs found for this city" });
      }
  
      res.status(200).json(jobs);  
    } catch (error) {
      res.status(500).json({ message: "Error fetching jobs by city", error: error.message });
    }
  };

  exports.jobByCategoryName = async (req, res) => {
    try {
      
      const { category_name } = req.body;
  
      
      const category = await Category.findOne({ CategoryName: category_name });
  
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      
      const jobs = await Job.aggregate([
        {
          $match: { category: category._id } 
        },
        {
          $lookup: {
            from: "categories", 
            localField: "category", 
            foreignField: "_id", 
            as: "categoryDetails" 
          }
        },
        {
          $unwind: "$categoryDetails" 
        },
        {
          $group: {
            _id: "$category", 
            categoryName: { $first: "$categoryDetails.CategoryName" }, 
            jobTitles: { $push: "$title" } 
          }
        }
      ]);
  
      if (jobs.length === 0) {
        return res.status(404).json({ message: "No jobs found for this category" });
      }
  
      res.status(200).json(jobs); 
    } catch (error) {
      res.status(500).json({ message: "Error fetching jobs by category", error: error.message });
    }
  };
  
  
  
  module.exports = router;