import { NamingStrategyNotFoundError, Repository, TransactionRollbackEvent } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "src/repository/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { UpdateTaskDto } from "./dto/update-task.dto";

export class TaskRepository {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async create(dto: CreateTaskDto): Promise<Task> {
        if (!dto.answer) {
            const err = new BadRequestException('Не указаны контакты пользователя');
            console.log(err)
            throw err;
        }
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

    async delete(id: number) {
        const entity = await this.taskRepository.findOne({
            where: {id},
        });
        if (!entity) throw new NotFoundException(`Задача с id: ${id} не найдена`);
        const result = await this.taskRepository.delete(entity);
        if (result?.affected > 0) return true;
        throw new NotFoundException(`Задача с id: ${id} не найдена`);
    }
}