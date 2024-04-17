
import { ApiProperty } from "@nestjs/swagger";
import { Task } from "src/repository/task.entity";

export class TaskDto {
    static build(entity: Task) {
        const dto = new TaskDto();
        const json = JSON.stringify(entity, (key, value) => {
            return key === 'id' ? undefined : value;
        });
        Object.assign(dto, JSON.parse(json));
        return dto;
    }

    @ApiProperty({
        description: 'Текст проблемы',
        type: String,
        example: 'Нет доступа к ресурсу',
    })
    text: string

    @ApiProperty({
        description: 'Куда необходимо ответить',
        type: String,
        example: 'example@mail.com'
    })
    answer: string;

    @ApiProperty({
        description: 'Заголовок задачи',
        type: String,
        example: 'Какой-то заголовок',
    })
    header: string;
}