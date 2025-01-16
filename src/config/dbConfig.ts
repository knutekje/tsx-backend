import { DataSource } from 'typeorm';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST, // Provided by Docker Compose
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER, // Provided by Docker Compose
    password: process.env.DB_PASSWORD, // Provided by Docker Compose
    database: process.env.DB_NAME, // Provided by Docker Compose
    synchronize: process.env.TYPEORM_SYNC === 'true', // Enable/disable synchronization
    logging: process.env.TYPEORM_LOGGING === 'true', // Enable/disable logging
    entities: [`${__dirname}/../models/*.{ts,js}`], // Adjust the path to entities
    migrations: [`${__dirname}/../migrations/*.{ts,js}`], // Adjust the path to migrations
});
