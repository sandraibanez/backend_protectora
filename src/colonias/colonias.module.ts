import { Module } from '@nestjs/common';
import { ColoniasService } from './colonias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colonias } from './colonias.entity';
import { ColoniasController } from './colonias.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Colonias])],
  controllers: [ColoniasController],
  providers: [ColoniasService],
})
export class ColoniasModule { }
