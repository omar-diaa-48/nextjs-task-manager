import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './dto/task-validation-pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto:GetTasksFilterDTO):Task[]{
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTasksWithFilters(filterDto);
    //     }
    //     return this.tasksService.getAllTasks();
    // }

    @Get('/:taskId')
    getTaskById(@Param('taskId', ParseIntPipe) taskId : number):Promise<Task>{
        return this.tasksService.getTaskById(taskId)
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDto:CreateTaskDTO) :Task{
    //     return this.tasksService.createTask(createTaskDto);
    // }

    // @Delete('/:taskId')
    // deleteTask(@Param('taskId') taskId:string):string{
    //     return this.tasksService.deleteTask(taskId)
    // }

    // @Patch('/:taskId/status')
    // updateTask(
    //     @Param('taskId') taskId:string,
    //     @Body('status', TaskStatusValidationPipe) status:TaskStatus
    // ){
    //     return this.tasksService.updateTask(taskId, status)
    // }
}
