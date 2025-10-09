import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonacionesViveres } from './donaciones_viveres.entity';
import { DonacionesViveresController } from './donaciones_viveres.controller';
import { DonacionesViveresService } from './donaciones_viveres.service';
@Module({
  imports: [TypeOrmModule.forFeature([DonacionesViveres])],
  controllers: [DonacionesViveresController],
  providers: [DonacionesViveresService],
})
export class DonacionesViveresModule { }
