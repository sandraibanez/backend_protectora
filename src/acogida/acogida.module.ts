import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acogida } from './acogida.entity';
import { AcogidaController } from './acogida.controller';
import { AcogidaService } from './acogida.service';
import { Animal } from 'src/animal/animal.entity';
import { User } from 'src/user/user.entity';
import { AppConfig } from 'src/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Acogida,
      Animal,
      User,
    ])
  ],
  controllers: [AcogidaController],
  providers: [AcogidaService, AppConfig],
  exports: [TypeOrmModule],
})
export class AcogidaModule {}
