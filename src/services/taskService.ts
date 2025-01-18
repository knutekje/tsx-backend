import { Task } from "../models/task";
import { taskType } from "../types";
import { TaskRepository } from "../repository/taskRepository";

export class TaskService{
        async getAllTasks(){
            return TaskRepository.find();
        }


        async getTaskById(taskid: string){
            
        }
        async createTask(task: taskType){
            console.log(`task in the service ${task.title}`)
            TaskRepository.save(task)
        }

        async completeTask(taskId: string){

        }

        async deleteTask(taskId: string){

        }
}