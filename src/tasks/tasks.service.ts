import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v1 as uuidv1 } from "uuid";
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status-enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository : TaskRepository
        ){

    }

    getTasks(filterDto:GetTasksFilterDTO){
        
    }

    async createTask(createTaskDto:CreateTaskDTO):Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    async getTaskById(taskId:number):Promise<Task>{
        const found = await this.taskRepository.findOne(taskId);

        if(!found){
            throw new NotFoundException(`Task with id ${taskId} not found`)
        }

        return found;
    }

    async deleteTask(taskId : number):Promise<number>{

        const result = await this.taskRepository.delete(taskId)

        if(result.affected === 0){
            throw new NotFoundException(`Task with id ${taskId} not found`)
        }

        return taskId;
    }

    async updateTask(taskId:number, status:TaskStatus):Promise<Task>{
        const task = await this.getTaskById(taskId);

        task.status = status;
        await task.save();

        return task;
    }
}
