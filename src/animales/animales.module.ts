import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animales } from './animales.entity';
import { AnimalesController } from './animales.controller';
import { AnimalesService } from './animales.service';

@Module({
  imports: [TypeOrmModule.forFeature([Animales])],
  controllers: [AnimalesController],
  providers: [AnimalesService],
})
export class AnimalesModule {}
