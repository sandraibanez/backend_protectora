import { Module } from '@nestjs/common';
import { IngresosController } from './ingresos.controller';

@Module({
  controllers: [IngresosController]
})
export class IngresosModule {}
