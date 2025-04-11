const Candidate=require("../models/candidates");
const Institution=require("../models/Institution");
const Job =require("../models/job");

const findCandidatesByDistance = async (req, res) => {
    try {
        const { distance } = req.query; // Distance in km
        const {institutionId}= req.user?.id;

        // Find Institution by ID
        const institution = await Institution.findById(institutionId);
        if (!institution) {
            return res.status(404).json({ message: "Institution not found" });
        }

        // Extract institution coordinates
        const [institutionLat, institutionLon] = institution.location.coordinates;

        // Fetch all candidates and filter them using the Haversine formula
        const candidates = await Candidate.find({
            latitude: { $ne: null }, // Ensure valid coordinates exist
            longitude: { $ne: null }
        });

        // Filter candidates within the specified distance
        const filteredCandidates = candidates.filter(candidate => {
            const candidateLat = candidate.latitude;
            const candidateLon = candidate.longitude;
            return haversine(institutionLat, institutionLon, candidateLat, candidateLon) <= distance;
        });

        res.status(200).json({ candidates: filteredCandidates });

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

//To add a new job
const addJob = async (req, res) => {
    try {
        const instId = req.user?.id; // Get institution ID from authenticated user
        
        // Extract job details from request body
        const {
            title, department, address, category, employment_type, experience_level,
            min_experience, max_experience, description, requirements,
            prefered_qualifications, responsibilities, benefits,
            posted_date, closing_date, status, hiring_manager,
            recruiters, max_applications, is_active,
            allow_multiple_applications, salary_range
        } = req.body;
        
        // Ensure address fields are provided
        if (!address || !address.street || !address.city || !address.state || !address.country) {
            return res.status(400).json({ error: "Incomplete address details." });
        }
        
        // Create new job instance (geocoding handled in schema pre-save hook)
        const newJob = new Job({
            Institution_id:instId,
            title,
            department,
            address,
            category,
            employment_type,
            experience_level,
            min_experience,
            max_experience,
            description,
            requirements,
            prefered_qualifications,
            responsibilities,
            benefits,
            posted_date,
            closing_date,
            status,
            hiring_manager,
            recruiters,
            max_applications,
            is_active,
            allow_multiple_applications,
            salary_range
        });
        
        // Save job to the database (triggers pre-save geocoding)
        await newJob.save();
        res.status(201).json({ message: "Job created successfully", job: newJob });
    } catch (error) {
        console.error("Error adding job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const filterCandidates = async (req, res) => {
    try {
      const { skill, education, city } = req.body;
  
      let filter = {};
  
      if (city) {
        filter["address.city"] = city;
      }
  
      if (skill) {
         filter["skills"] = { $in: skill };
      }
  
      if (education) {
        filter["education"] = {
          $elemMatch: {
            education: { $regex: education, $options: "i" }
          }
        };
      }
  
      const cand = await Candidate.find(filter, { _id: 0 });
  
      if (cand.length === 0) {
        return res.status(404).json({ message: "No candidate found matching the criteria" });
      }
  
      res.status(200).json(cand);
    } catch (error) {
      res.status(500).json({ message: "Error fetching candidates", error: error.message });
    }
  };
  


module.exports={findCandidatesByDistance,addJob,filterCandidates};