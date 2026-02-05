import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Request, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminUpdateUserDto, CreateUserDto, UpdatePasswordDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { log } from 'console';
import { ApiTags, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Users') 
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  // Admin pueda ver todos los usarios
  @ApiOperation({ summary: 'Obtener todos los usuarios (solo admin)' })  
  @UseGuards(AuthGuard)
  @Get("get")
  findAll(@Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent === "admin") {
      return this.userService.findAll();
    } else {
      throw new HttpException('No tienes permisos para ver la informacion de los usuarios', HttpStatus.FORBIDDEN);
    }
  }

  // Usuario pueda ver su información
  @ApiOperation({ summary: 'Obtener información del usuario logeado' }) 
  @UseGuards(AuthGuard)
  @Get('get-me')
  getMyUser(@Request() req) {
    return this.userService.getUserClient(req.user.id_user);
  }
  
  // Usuario admin o cliente pueda ver una parte de la informacion de un usuario en concreto
  @ApiOperation({ summary: 'Obtener información limitada de un usuario' }) 
  @UseGuards(AuthGuard)
  @Get('get-client/:id_user')
  getUserClient(@Param('id_user') id_user: number, @Request() req) {
    let userCurrent = req.user;
    // Si es admin puede ver cualquier usuario 
    if (userCurrent.rol === 'admin') { 
      return this.userService.getUserClient(id_user); 
    } 
    // Si es cliente o veterinario solo puede ver su propia info 
    if (userCurrent.rol === 'cliente' || userCurrent.rol == 'veterinario') { 
      return this.userService.getUserClient(userCurrent.id_user); 
    }

    throw new HttpException( 'No tienes permisos para ver la información de los usuarios', HttpStatus.FORBIDDEN );
  }
  
  // Registra un nuevo usuario (solo cliente??)
  @ApiOperation({ summary: 'Registrar un nuevo usuario' }) 
  @Post("post")
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // Actualizar usuario
  @ApiOperation({ summary: 'Actualizar datos de un usuario (solo admin)' })
  @UseGuards(AuthGuard)
  @Put('put-admin/:id_user')
  @ApiBody({ type: AdminUpdateUserDto })
  updateUserAsAdmin( @Param('id_user') id_user: number, @Body() updateUserDto: AdminUpdateUserDto, @Request() req) {
    if (req.user.rol !== 'admin') {
      throw new HttpException('No tienes permisos', HttpStatus.FORBIDDEN);
    }

    return this.userService.adminUpdateUser(id_user, updateUserDto);
  }


  // Usuario puede actualizar su informacion
  @ApiOperation({ summary: 'Actualizar datos del usuario logeado' }) 
  @UseGuards(AuthGuard)
  @Put('put-me')
  updateMyUser(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.userService.updateUser(req.user.id_user, updateUserDto);
  }

  // usuario puede actualizar su contraseña
  @ApiOperation({ summary: 'Actualizar contraseña del usuario logeado' }) 
  @UseGuards(AuthGuard)
  @Put('put-me/password')
  updateMyPassword(@Body() body: UpdatePasswordDto, @Request() req) {
    const id_user = req.user.id_user;

    return this.userService.updatePassword(
      id_user,
      body.currentPassword,
      body.newPassword
    );
  }


  // el usuario tipo admin puede eliminar un usuario
  @ApiOperation({ summary: 'Eliminar un usuario (solo admin)' }) 
  @UseGuards(AuthGuard)
  @Delete('delete-:id_user')
  deleteUser(@Param('id_user') id_user: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent === "admin") {
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
