import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseFilters } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiBody, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';
import { HttpExceptionFilter } from 'src/tools/exception-filter';
import { Exception } from 'src/tools/exception-schema';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
@UseFilters(HttpExceptionFilter)
@ApiTags('Задачи')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    description: 'Создание задачи',
  })
  @ApiBody({
    description: 'Параметры создания задачи',
    type: CreateTaskDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Задача добавлена',
    type: TaskDto,
  })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @ApiOperation({
    description: 'Получение всех задач',
  })
  @ApiResponse({
    status: 200,
    description: 'Получены задачи',
    type: TaskDto,
    isArray: true
  })
  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }

  @ApiOperation({
    description: 'Получение задачи по id',
  })
  @ApiResponse({
    status: 200,
    description: 'Получена задача',
    type: TaskDto,
  })
  @ApiNotFoundResponse({
    description: 'Задача с таким id не найдена',
    type: Exception,
    status: 404,
  })
  @Get(':id(\\d+)')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.findOne(id);
  }

  @ApiOperation({
    description: 'Обновление задачи по id',
  })
  @ApiResponse({
    status: 200,
    description: 'Обновлена задача',
    type: TaskDto,
  })
  @ApiBody({
    description: 'Параметры изменения задачи',
    type: UpdateTaskDto,
  })
  @ApiNotFoundResponse({
    description: 'Задача с таким id не найдена',
    type: Exception,
    status: 404,
  })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return await this.taskService.update(id, dto);
  }
}
