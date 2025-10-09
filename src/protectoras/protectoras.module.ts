import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtectorasService } from './protectoras.service';
import { Protectoras } from './protectoras.entity';
import { ProtectorasController } from './protectoras.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Protectoras])],
  controllers: [ProtectorasController],
  providers: [ProtectorasService],
})
export class ProtectorasModule { }
