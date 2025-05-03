import { createClient } from "redis";
import { REDIS_HOST, REDIS_PORT } from "./env.js";

const redisClient = createClient({
	url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

(async () => {
	try {
		await redisClient.connect();
		console.log("✅ Redis connected");
	} catch (err) {
		console.error("❌ Redis connection error:", err);
		process.exit(1);
	}
})();

redisClient.on("error", (err) => {
	console.error("❌ Redis error:", err);
});

export default redisClient;
