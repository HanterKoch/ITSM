import { BadRequestException, HttpException } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger";

export class Exception {
    static build<T extends HttpException>(exception: HttpException) {
        const { message } = exception;
        return {message} as T;
    }

    @ApiProperty({
        description: 'Сообщение ошибки',
        type: String,
        example: 'Не найдено',
    })
    message: string;

}