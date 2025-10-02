import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';

@Module({
  providers: [GastosService]
})
export class GastosModule {}
