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

const DistCount= async (req, res) => {
    const { lat1, lon1, lat2, lon2 } = req.body;

    // Validate input
    if (
        lat1 === undefined || lon1 === undefined || 
        lat2 === undefined || lon2 === undefined
    ) {
        return res.status(400).json({ message: "All latitude and longitude values are required." });
    }

    const distance = haversine(lat1, lon1, lat2, lon2);
    
    res.json({ distance: `${distance.toFixed(2)} km` });
};

module.exports={ DistCount };
