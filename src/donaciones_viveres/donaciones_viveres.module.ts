import { Module } from '@nestjs/common';
import { DonacionesViveresController } from './donaciones_viveres.controller';

@Module({
  controllers: [DonacionesViveresController]
})
export class DonacionesViveresModule {}
