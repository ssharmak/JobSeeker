const {Candidate}=require("../models/candidates");
const {Institution}=require("../models/Institution");

const findCandidates = async (req, res) => {
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
}

module.exports={findCandidates};