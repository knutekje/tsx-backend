/* import request from 'supertest';
import { AppDataSource } from '../../config/dbConfig';
import { app } from '../../main';

beforeAll(async () => {
    await AppDataSource.initialize();
});

afterAll(async () => {
    await AppDataSource.destroy();
});

describe('Task Routes', () => {
    it('should fetch all tasks', async () => {
        const response = await request(app).get('/api/tasks');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should create a new task', async () => {
        const newTask = { title: 'Test Task', description: 'This is a test' };
        const response = await request(app).post('/api/tasks').send(newTask);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Task');
    });
});
 */