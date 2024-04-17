import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAuthDto } from './dto/user-auth.dto';

@Controller('users')
@ApiTags('Пользователи')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: 'Авторизация'
  })
  @ApiBody({
    description: 'Параметры входа',
    type: UserAuthDto,
  })
  @Post('auth')
  async auth(@Body() dto: UserAuthDto) {
    return true;
  }
}
