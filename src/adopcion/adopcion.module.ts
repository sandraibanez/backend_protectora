import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adopcion } from './adopcion.entity';
import { AdopcionController } from './adopcion.controller';
import { AdopcionService } from './adopcion.service';
import { Animal } from 'src/animal/animal.entity';
import { User } from 'src/user/user.entity';
import { AppConfig } from 'src/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Adopcion,
      Animal,
      User,
    ])
  ],
  controllers: [AdopcionController],
  providers: [AdopcionService, AppConfig],
  exports: [TypeOrmModule],
})
export class AdopcionModule {}
