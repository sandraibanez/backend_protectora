import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoController } from './ingreso.controller';
import { Ingreso } from './ingreso.entity';
import { IngresoService } from './ingreso.service';
import { Protectora } from 'src/protectora/protectora.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Ingreso, Protectora])],
  controllers: [IngresoController],
  providers: [IngresoService],
  exports: [TypeOrmModule]
})
export class IngresosModule { }
