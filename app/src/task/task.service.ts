import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const result = await this.taskRepository.create(createTaskDto);
    return TaskDto.build(result);
  }

  async findAll() {
    const result = await this.taskRepository.findAll();
    return result.map(TaskDto.build);
  }

  async findOne(id: number) {
    const result = await this.taskRepository.findOne(id);
    return TaskDto.build(result);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update(id, updateTaskDto);
  }

  async delete(id: number) {
    return await this.taskRepository.delete(id);
  }
}
