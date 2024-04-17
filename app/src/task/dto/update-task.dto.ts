import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiProperty({
        description: 'Выполнена ли задача',
        type: Boolean,
        example: true,
    })
    isCompleted: boolean
}
