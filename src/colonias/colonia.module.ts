import { Module } from '@nestjs/common';
import { ColoniaService } from './colonia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colonia } from './colonia.entity';
import { ColoniaController } from './colonia.controller';
import { Protectora } from 'src/protectora/protectora.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Colonia, Protectora])],
  controllers: [ColoniaController],
  providers: [ColoniaService],
  exports: [TypeOrmModule]
})
export class ColoniasModule { }
