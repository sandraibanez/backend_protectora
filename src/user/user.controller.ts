import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Request, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from './guard';
import { log } from 'console';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  // login para los usurios
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.userService.signIn(signInDto.email, signInDto.password);
  }

  // la informacion del usuario que esta logeado para el profile
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.getUser(req.user.idUser);
  }

  // para que el usuario admin pueda ver todos los uusarios de la aplicacion
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent == "admin") {
      return this.userService.findAll();
    } else {
      throw new HttpException('No tienes permisos para ver la informacion de los usuarios', HttpStatus.FORBIDDEN);
    }
  }

  // para que un usuario admin pueda ver toda la informacion de un usuario en concreto
  @UseGuards(AuthGuard)
  @Get(':id_user')
  getUser(@Param('id_user') id_user: number, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent == "admin") {
      const idUser = id_user;
      return this.userService.getUser(idUser);
    } else {
      throw new HttpException('No tienes permisos para ver la informacion de los usuarios', HttpStatus.FORBIDDEN);
    }
  }

  // para que un usuario admin o cliente pueda ver una parte de la informacion de un usuario en concreto
  @UseGuards(AuthGuard)
  @Get('client/:id_user')
  getUserClient(@Param('id_user') id_user: number, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent == "admin" || userCurrent == "cliente") {
      const idUser = id_user;
      return this.userService.getUserClient(idUser);
    } else {
      throw new HttpException('No tienes permisos para ver la informacion de los usuarios', HttpStatus.FORBIDDEN);
    }
  }

  // registra un nuevo usuario
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // actualizar los datos del usuario 
  @UseGuards(AuthGuard)
  @Put()
  updateUser( @Body() updateUserDto: UpdateUserDto, @Request() req) {
    let id_user = req.user.idUser;
    console.log(id_user);
    const userId = parseInt(id_user);
    if (isNaN(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    return this.userService.updateUser({
      ...updateUserDto,
      id_user: userId,
    });
  }

  // el usuario tipo admin puede eliminar un usuario
  @UseGuards(AuthGuard)
  @Delete(':id_user')
  deleteUser(@Param('id_user') id_user: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent == "admin") {
      const userId = parseInt(id_user);
      if (isNaN(userId)) {
        throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
      }
      return this.userService.deleteUser(userId);
    } else {
      throw new HttpException('No tienes permisos para eliminar usuarios', HttpStatus.FORBIDDEN);
    }


  }
}