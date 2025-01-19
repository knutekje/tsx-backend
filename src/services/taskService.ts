import { taskType } from "../types";
import { TaskRepository } from "../repository/taskRepository";

export class TaskService{

    
        async getAllTasks(){
            return TaskRepository.find();
        }


        async getTaskById(taskId: number){
            try {
                const task = await TaskRepository.findOneBy({ id: taskId }); 
                if (!task) {
                    throw new Error(`Task with ID ${taskId} not found`);
                }
                return task;
            } catch (error) {
                console.error('Error finding task by ID:', error);
                throw new Error('Could not find the task');
            }
        }

        async createTask(task: taskType){
            console.log(`task in the service ${task.title}`)
            TaskRepository.save(task)
        }



        async completeTask(taskId: number){
            try{
                const task = await TaskRepository.findOneBy({id: taskId})
                if(!task){
                    throw new Error(`No task with id ${taskId}`)
                }
                task.status = 'Completed'
                await TaskRepository.save(task)
            }catch(error){
                console.log(`eror ${error}`)
            }
            
        }

        async deleteTask(taskId: number): Promise<void> {
            try {
              const result = await TaskRepository.delete({ id: taskId });
          
              if (result.affected === 0) {
                throw new Error(`Task with ID ${taskId} not found`);
              }
            } catch (error) {
              console.error('Error deleting task:', error);
              throw error;
            }
          }
}