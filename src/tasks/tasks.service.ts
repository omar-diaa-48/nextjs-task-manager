import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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

    async getTasks(filterDto:GetTasksFilterDTO, user:User):Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto, user);
    }

    async createTask(createTaskDto:CreateTaskDTO, user:User):Promise<Task>{
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async getTaskById(taskId:number, user:User):Promise<Task>{
        const found = await this.taskRepository.findOne(taskId, {where : {id:taskId, owner:user}});

        if(!found){
            throw new NotFoundException(`Task with id ${taskId} not found`)
        }

        return found;
    }

    async deleteTask(taskId : number, user:User):Promise<number>{

        const result = await this.taskRepository.delete({id:taskId, owner:user})

        if(result.affected === 0){
            throw new NotFoundException(`Task with id ${taskId} not found`)
        }

        return taskId;
    }

    async updateTask(taskId:number, status:TaskStatus, user:User):Promise<Task>{
        const task = await this.getTaskById(taskId, user);

        task.status = status;
        await task.save();

        return task;
    }
}
