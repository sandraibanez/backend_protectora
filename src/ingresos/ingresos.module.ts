import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresosController } from './ingresos.controller';
import { Ingresos } from './ingresos.entity';
import { IngresosService } from './ingresos.service';
@Module({
  imports: [TypeOrmModule.forFeature([Ingresos])],
  controllers: [IngresosController],
  providers: [IngresosService],
})
export class IngresosModule { }
