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
    return {
      id_user: req.user.id_user,
      nombre: req.user.nombre,
      rol: req.user.rol,
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    const usernames = username;
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

  @UseGuards(AuthGuard)
  @Delete(':id_user')
  deleteUser(@Param('id_user') id_user: string, @Request() req) {
    let userCurrent = req.user.rol;
    console.log(userCurrent);
    console.log(req.user);
    if (userCurrent == "admin") {
      console.log("admin");
      const userId = parseInt(id_user);
      if (isNaN(userId)) {
        throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
      }
      return this.userService.deleteUser(userId);
    } else {
      console.log(req.user);
      throw new HttpException('No tienes permisos para eliminar usuarios', HttpStatus.FORBIDDEN);
    }


  }
}