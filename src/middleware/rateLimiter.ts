import { Request, Response, NextFunction } from "express";
import redisClient from "../utils/redisClient";


const rateLimiter = (limit: number, windowSeconds: number) => async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  const key = `rate:${ip}`;

  try {
    const requests = await redisClient.incr(key);

    if (requests === 1) {
      await redisClient.expire(key, windowSeconds);
    }

    if (requests > limit) {
      const ttl = await redisClient.ttl(key);
       res.status(429).json({
        message: `Too many requests from${ip}. Please try again in ${ttl} seconds.`,
      });
    }

    next(); 
  } catch (err) {
    console.error("Rate Limiter Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

export default rateLimiter;
