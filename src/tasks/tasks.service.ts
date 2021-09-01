import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from "uuid";
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks():Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto:GetTasksFilterDTO):Task[]{
        const { search, status } = filterDto;
        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status)
        }

        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }

        return tasks;
    }

    createTask(createTaskDto : CreateTaskDTO):Task{
        const { title, description } = createTaskDto

        const task:Task = {
            id:uuidv1(),
            title,
            description,
            status:TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    getTaskById(taskId : string):Task{
        return this.tasks.find(task => task.id === taskId);
    }

    deleteTask(taskId : string):string{
        this.tasks = this.tasks.filter(task => task.id !== taskId)
        return taskId;
    }

    updateTask(taskId:string, status:TaskStatus):Task{
        const task = this.getTaskById(taskId)
        task.status = status
        return task;
    }
}
