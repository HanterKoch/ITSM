import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { Task } from 'src/repository/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TaskController],
  imports: [
    TypeOrmModule.forFeature([
      Task,
    ])
  ],
  providers: [
    TaskService,
    TaskRepository
  ],
})
export class TaskModule {}
