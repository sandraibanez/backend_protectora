import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from './guard';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly userService: UserService,
    private readonly userAuth: AuthService,
  ) { }

  // login para los usurios
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: AuthDto) {
    return this.userAuth.signIn(signInDto.email, signInDto.password);
  }

  // la informacion del usuario que esta logeado para el profile
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.getUser(req.user.idUser);
  }

}
