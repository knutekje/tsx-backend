import express from 'express';
import { AppDataSource } from './config/dbConfig';
import { taskRoutes } from './routes/taskRoutes';
import cors from 'cors';
import 'reflect-metadata';
import { authRoutes } from './routes/authRoutes';
//import { createClient } from "redis";
import rateLimiter from './middleware/rateLimiter';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from './config/swaggerOptions';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/loggerMiddleware';



export const app = express();
const PORT = 3000;
app.use(express.json()); 

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);

/* const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const redisClient = createClient({
  url: redisUrl,
}); */
app.use(rateLimiter(5, 10));

app.use((req, res, next) =>{
     const now = new Date();
     console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);
     next();
})

const jwtSecret = process.env.JWT_SECRET;
//const jwtExpiration = process.env.JWT_EXPIRATION;


if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined');
}

app.use(cors());
app.use(requestLogger);

app.use('/api/tasks', taskRoutes);
app.use('/auth', authRoutes)

app.use(errorHandler);

AppDataSource.initialize()
    .then(() => {

        console.log('Database connected successfully');
        app.listen(4000, () => {
            console.log('Server is running on http://localhost:4000');
            
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
    });