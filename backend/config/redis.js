import { createClient } from "redis";
import { REDIS_HOST, REDIS_PORT } from "./env.js";

// Create Redis client with fallback options
const createRedisClient = () => {
  // Check if Redis config is available
  if (!REDIS_HOST || !REDIS_PORT) {
    console.log("⚠️ Redis configuration missing, using memory-only mode");
    // Return a dummy client when Redis config is missing
    return {
      isOpen: false,
      connect: async () => console.log("⚠️ Running without Redis"),
      on: () => {},
      // Add other methods that might be used in your app
      get: async () => null,
      set: async () => {},
      del: async () => {},
      // Add any other Redis methods your application uses
    };
  }

  // Create actual Redis client when config is available
  return createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  });
};

const redisClient = createRedisClient();

// Function to connect to Redis
const connectRedis = async () => {
  try {
    if (redisClient.isOpen === false) {
      await redisClient.connect();
      console.log("✅ Redis connected");
    }
    return true;
  } catch (err) {
    console.error("❌ Redis connection error:", err);
    // Don't exit the process on connection failure
    return false;
  }
};

// Set up error handler if it's a real Redis client
if (typeof redisClient.on === 'function') {
  redisClient.on("error", (err) => {
    console.error("❌ Redis error:", err);
    // Just log the error, don't crash the app
  });
}

export { connectRedis };
export default redisClient;
