import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { jwtConstants } from '../authentication/guards/constants';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/config/app.config';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, AppConfig],
  exports: [TypeOrmModule, UserService]
})
export class UserModule { }
