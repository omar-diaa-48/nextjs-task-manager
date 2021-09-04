import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './dto/task-validation-pipe';
import { TaskStatus } from './task-status-enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@
        Query(ValidationPipe) filterDto:GetTasksFilterDTO,
        @GetUser() user:User
        ):Promise<Task[]>{
        this.logger.verbose(`User ${user.username} getting all tasks. Filters ${JSON.stringify(filterDto)}`)
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:taskId')
    getTaskById(
        @Param('taskId', ParseIntPipe) taskId : number,
        @GetUser() user : User
        ):Promise<Task>{
        return this.tasksService.getTaskById(taskId, user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto:CreateTaskDTO,
        @GetUser() user:User
        ) :Promise<Task>{
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete('/:taskId')
    deleteTask(
        @Param('taskId', ParseIntPipe) taskId:number,
        @GetUser() user:User
        ):Promise<number>{
        return this.tasksService.deleteTask(taskId, user)
    }

    @Patch('/:taskId/status')
    updateTask(
        @Param('taskId') taskId:number,
        @Body('status', TaskStatusValidationPipe) status:TaskStatus,
        @GetUser() user :User
    ):Promise<Task>{
        return this.tasksService.updateTask(taskId, status, user)
    }
}
