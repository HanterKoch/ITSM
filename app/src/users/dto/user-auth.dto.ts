import { ApiProperty } from "@nestjs/swagger";

export class UserAuthDto {
    @ApiProperty({
        description: 'Логин',
        type: String,
        example: 'login',
    })
    login: string;

    @ApiProperty({
        description: 'Пароль',
        type: String,
        example: '123456',
    })
    password: string;
}