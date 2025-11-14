import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GastoService } from './gasto.service';
import { Gasto } from './gasto.entity';
import { GastoController } from './gasto.controller';
import { Protectora } from 'src/protectora/protectora.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Gasto, Protectora])],
  controllers: [GastoController],
  providers: [GastoService],
  exports: [TypeOrmModule]
})
export class GastoModule { }
