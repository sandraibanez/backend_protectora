import { Module } from '@nestjs/common';
import { ColoniaService } from './colonia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colonia } from './colonia.entity';
import { ColoniaController } from './colonia.controller';
import { Protectora } from 'src/protectora/protectora.entity';
import { Animal } from 'src/animal/animal.entity';
import { AppConfig } from 'src/config/app.config';

@Module({
  imports: [TypeOrmModule.forFeature([Colonia, Protectora, Animal])],
  controllers: [ColoniaController],
  providers: [ColoniaService, AppConfig],
  exports: [TypeOrmModule]
})
export class ColoniasModule { }
