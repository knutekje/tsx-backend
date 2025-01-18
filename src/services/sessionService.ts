/* import redisClient from "../utils/redisClient";

export class SessionService {
  static async createSession(sessionId: string, data: any, ttlSeconds: number) {
    const key = `upload:${sessionId}`;
    await redisClient.hSet(key, data); 
    await redisClient.expire(key, ttlSeconds); 
    return key;
  }

  static async updateSession(sessionId: string, data: any) {
    const key = `upload:${sessionId}`;
    const exists = await redisClient.exists(key);
    if (!exists) throw new Error(`Session ${sessionId} does not exist`);
    await redisClient.hSet(key, data);
  }

  static async getSession(sessionId: string) {
    const key = `upload:${sessionId}`;
    const data = await redisClient.hGetAll(key);
    if (!Object.keys(data).length) throw new Error(`Session ${sessionId} not found`);
    return data;
  }

  static async deleteSession(sessionId: string) {
    const key = `upload:${sessionId}`;
    await redisClient.del(key);
  }
}
 */