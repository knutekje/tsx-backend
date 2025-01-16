import express from 'express';
import { AppDataSource } from './config/dbConfig';
import { taskRoutes } from './routes/taskRoutes';

const app = express();
const PORT = 3000;

app.use(express.json()); 

app.use('/api/tasks', taskRoutes);

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