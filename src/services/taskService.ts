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

        }

        async completeTask(taskId: string){

        }

        async deleteTask(taskId: string){

        }
}