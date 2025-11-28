import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Request, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from './guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.userService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    const usernames = username;
    // if (usernames) {
    //   throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    // }
    return this.userService.getUser(usernames);
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


