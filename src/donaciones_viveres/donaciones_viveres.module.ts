import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonacionesViveres } from './donaciones_viveres.entity';
import { DonacionesViveresController } from './donaciones_viveres.controller';
import { DonacionesViveresService } from './donaciones_viveres.service';
import { Protectora } from 'src/protectora/protectora.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DonacionesViveres, Protectora])],
  controllers: [DonacionesViveresController],
  providers: [DonacionesViveresService],
  exports: [TypeOrmModule]
})
export class DonacionesViveresModule { }
