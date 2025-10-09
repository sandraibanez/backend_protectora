import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GastosService } from './gastos.service';
import { Gastos } from './gastos.entity';
import { GastosController } from './gastos.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Gastos])],
  controllers: [GastosController],
  providers: [GastosService],
})
export class GastosModule { }
