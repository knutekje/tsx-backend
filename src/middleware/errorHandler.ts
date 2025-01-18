import { Request, Response, NextFunction } from "express";

import { logger } from "../config/logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
      route: req.originalUrl,
    });
  
    res.status(500).json({
      message: "Internal Server Error",
    });
  };
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1); 
  });
  
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });