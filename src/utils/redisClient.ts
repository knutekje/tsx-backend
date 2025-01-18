import { createClient, RedisClientType } from "redis";

const redisUrl: string = process.env.REDIS_URL || "redis://localhost:6379";

const redisClient: RedisClientType = createClient({
  url: redisUrl,
});

redisClient
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err: Error) => console.error("Redis Connection Error:", err));

export default redisClient;
