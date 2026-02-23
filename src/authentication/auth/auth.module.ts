import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards/guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../guards/constants';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { AppConfig } from 'src/config/app.config';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '6000s' },
        }),
  ],
  providers: [
    AuthService,
    AppConfig,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  controllers: [AuthController],
  exports: [TypeOrmModule, AuthService]
})
export class AuthModule { }
