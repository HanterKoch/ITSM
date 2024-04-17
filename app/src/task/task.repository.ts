import { NamingStrategyNotFoundError, Repository, TransactionRollbackEvent } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "src/repository/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { UpdateTaskDto } from "./dto/update-task.dto";

export class TaskRepository {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async create(dto: CreateTaskDto): Promise<Task> {
        const entity = this.taskRepository.create();
        entity.answer = dto.answer;
        entity.issueText = dto.text;
        entity.header = dto.header;
        return await this.taskRepository.save(entity);
    }

    async findAll(): Promise<Array<Task>> {
        return await this.taskRepository.find({
            relations: {
                currentUser: true,
            }
        });
    }

    async findOne(id: number): Promise<Task> {
        const entity = await this.taskRepository.findOne({
            where: {id},
            relations: {
                currentUser: true,
            }
        });
        if (!entity) throw new NotFoundException(`Задача с id: ${id} не найдена`);
        return entity;
    }

    async update(id: number, dto: UpdateTaskDto) {
        const entity = await this.taskRepository.findOne({
            where: {id},
            relations: {
                currentUser: true,
            }
        });
        if (!entity) throw new NotFoundException(`Задача с id: ${id} не найдена`);
        entity.isCompleted = dto.isCompleted;
        return await this.taskRepository.save(entity);
    }
}