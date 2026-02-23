import { Module } from '@nestjs/common';
import { EntidadController } from './entidad.controller';
import { EntidadService } from './entidad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entidad } from './entidad.entity';
import { AppConfig } from 'src/config/app.config';

@Module({
    imports: [TypeOrmModule.forFeature([Entidad])],
    controllers: [EntidadController],
    providers: [EntidadService, AppConfig],
    exports: [TypeOrmModule]
})
export class EntidadModule { }
