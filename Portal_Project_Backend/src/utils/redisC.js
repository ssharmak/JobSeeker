const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient({
  url: 'redis://localhost:6379' 
});

redisClient.connect() // Must await this connection before usage
  .then(() => console.log("Redis client connected"))
  .catch((err) => console.error("Redis connection error:", err));

module.exports = redisClient;
