import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id_user')
  getUser(@Param('id_user') id_user: string) {
    const userId = parseInt(id_user);
    if (isNaN(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    return this.userService.getUser(userId);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id_user')
  updateUser(@Param('id_user') id_user: string, @Body() updateUserDto: UpdateUserDto) {
    const userId = parseInt(id_user);
    if (isNaN(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    return this.userService.updateUser({
      ...updateUserDto,
      id_user: userId,
    });
  }

  @Delete(':id_user')
  deleteUser(@Param('id_user') id_user: string) {
    const userId = parseInt(id_user);
    if (isNaN(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    return this.userService.deleteUser(userId);
  }
}


