import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animales } from './animales.entity';
import { AnimalesController } from './animales.controller';
import { AnimalesService } from './animales.service';
import { Protectoras } from 'src/protectoras/protectoras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animales, Protectoras])],
  controllers: [AnimalesController],
  providers: [AnimalesService],
  exports: [TypeOrmModule]
})
export class AnimalesModule {}
