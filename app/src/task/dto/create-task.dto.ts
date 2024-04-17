import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
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
