import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v1 as uuidv1 } from "uuid";
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository : TaskRepository
        ){

    }

    // getAllTasks():Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto:GetTasksFilterDTO):Task[]{
    //     const { search, status } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter(task => task.status === status)
    //     }

    //     if(search){
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    //     }

    //     return tasks;
    // }

    // createTask(createTaskDto : CreateTaskDTO):Task{
    //     const { title, description } = createTaskDto

    //     const task:Task = {
    //         id:uuidv1(),
    //         title,
    //         description,
    //         status:TaskStatus.OPEN
    //     };

    //     this.tasks.push(task);

    //     return task;
    // }

    async getTaskById(taskId:number):Promise<Task>{
        const found = await this.taskRepository.findOne(taskId);

        if(!found){
            throw new NotFoundException(`Task with id ${taskId} not found`)
        }

        return found;
    }

    // deleteTask(taskId : string):string{
    //     const found = this.getTaskById(taskId)
    //     this.tasks = this.tasks.filter(task => task.id !== found.id)
    //     return taskId;
    // }

    // updateTask(taskId:string, status:TaskStatus):Task{
    //     const task = this.getTaskById(taskId)
    //     task.status = status
    //     return task;
    // }
}
