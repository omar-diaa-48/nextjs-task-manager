import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './dto/task-validation-pipe';
import { TaskStatus } from './task-status-enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto:GetTasksFilterDTO):Promise<Task[]>{
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:taskId')
    getTaskById(@Param('taskId', ParseIntPipe) taskId : number):Promise<Task>{
        return this.tasksService.getTaskById(taskId)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:CreateTaskDTO) :Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:taskId')
    deleteTask(@Param('taskId', ParseIntPipe) taskId:number):Promise<number>{
        return this.tasksService.deleteTask(taskId)
    }

    @Patch('/:taskId/status')
    updateTask(
        @Param('taskId') taskId:number,
        @Body('status', TaskStatusValidationPipe) status:TaskStatus
    ):Promise<Task>{
        return this.tasksService.updateTask(taskId, status)
    }
}
