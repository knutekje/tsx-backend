/* import { TaskService } from '../../services/taskService';
import { TaskRepository } from '../../repository/taskRepository';

jest.mock('../repository/taskRepository');

describe('TaskService', () => {
    const taskService = new TaskService();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch all tasks', async () => {
        const mockTasks = [
            { id: 1, title: 'Task 1', status: 'To Do' },
            { id: 2, title: 'Task 2', status: 'Done' },
        ];
        (TaskRepository.find as jest.Mock).mockResolvedValue(mockTasks);

        const tasks = await taskService.getAllTasks();
        expect(tasks).toEqual(mockTasks);
        expect(TaskRepository.find).toHaveBeenCalled();
    });

    it('should create a new task', async () => {
        const mockTask = { id: 1, title: 'New Task', status: 'To Do' };
        (TaskRepository.create as jest.Mock).mockReturnValue(mockTask);
        (TaskRepository.save as jest.Mock).mockResolvedValue(mockTask);
        const currDate: Date = new Date();

        const task = await taskService.createTask({
            title: 'New Task',
            id: 0,
            description: '',
            status: '',
            photoUrl: '',
            dueDate: currDate,
            createdAt: currDate,
            updatedAt: currDate,
            user: {
                id: 0,
                username: '',
                email: '',
                displayName: '',
                role: '',
                createdAt: currDate,
                updatedAt: currDate,
                tasks: []
            }
        });
        expect(task).toEqual(mockTask);
        expect(TaskRepository.create).toHaveBeenCalledWith({ title: 'New Task' });
        expect(TaskRepository.save).toHaveBeenCalledWith(mockTask);
    });
});
 */