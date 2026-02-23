import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apadrinamiento } from './apadrinamiento.entity';
import { ApadrinamientoController } from './apadrinamiento.controller';
import { ApadrinamientoService } from './apadrinamiento.service';
import { Animal } from 'src/animal/animal.entity';
import { User } from 'src/user/user.entity';
import { AppConfig } from 'src/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Apadrinamiento,
      Animal,
      User,
    ])
  ],
  controllers: [ApadrinamientoController],
  providers: [ApadrinamientoService, AppConfig],
  exports: [TypeOrmModule],
})
export class ApadrinamientoModule {}
