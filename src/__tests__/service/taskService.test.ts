import { TaskService} from "../../services/taskService";
import { TaskRepository} from "../../repository/taskRepository";
import {taskType } from "../../types";

jest.mock('../../repository/taskRepository'); 
describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do' },
        { id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress' },
      ];
      (TaskRepository.find as jest.Mock).mockResolvedValue(mockTasks);

      const tasks = await taskService.getAllTasks();

      expect(TaskRepository.find).toHaveBeenCalledTimes(1);
      expect(tasks).toEqual(mockTasks);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask: taskType = {
        id: 1,
        title: 'New Task',
        description: 'New Description',
        status: 'To Do',
        photoUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: 1,
          username: "string",
          email: "string",
          displayName: "string", 
          role: "string",
          createdAt: new Date(),
          updatedAt: new Date(),
          tasks: [], 
        },
        dueDate: new Date('2025-12-31'),
      };
      
      (TaskRepository.save as jest.Mock).mockResolvedValue(newTask);

      await taskService.createTask(newTask);

      expect(TaskRepository.save).toHaveBeenCalledWith(newTask);
      expect(TaskRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      const taskId = 1;
      const mockTask = { id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do' };
  
      (TaskRepository.findOneBy as jest.Mock).mockResolvedValue(mockTask);
  
      const task = await taskService.getTaskById(taskId);
  
      expect(TaskRepository.findOneBy).toHaveBeenCalledWith({ id: taskId });
      expect(task).toEqual(mockTask);
    });
  });
  

  describe('completeTask', () => {
    it('should mark a task as completed', async () => {
      const taskId = 1;
      const mockTask = { id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do' };
  
      (TaskRepository.findOneBy as jest.Mock).mockResolvedValue(mockTask);
      (TaskRepository.save as jest.Mock).mockResolvedValue({ ...mockTask, status: 'Completed' });
  
      await taskService.completeTask(taskId);
  
      expect(TaskRepository.findOneBy).toHaveBeenCalledWith({ id: taskId });
  
      expect(TaskRepository.save).toHaveBeenCalledWith({ ...mockTask, status: 'Completed' });
    });
  });
  

  describe('deleteTask', () => {
    it('should delete a task by ID', async () => {
      const taskId = 1;
      (TaskRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      await taskService.deleteTask(taskId);

      expect(TaskRepository.delete).toHaveBeenCalledWith({ id: taskId });
    });

    it('should handle task not found during deletion', async () => {
      const taskId = 2;
    
      (TaskRepository.delete as jest.Mock).mockResolvedValue({ affected: 0 });
    
      await expect(taskService.deleteTask(taskId)).rejects.toThrow('Task with ID 2 not found');
    
      expect(TaskRepository.delete).toHaveBeenCalledWith({ id: taskId });
    });
    
  });
});
