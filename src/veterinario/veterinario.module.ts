import { Module } from '@nestjs/common';
import { VeterinarioController } from './veterinario.controller';
import { VeterinarioService } from './veterinario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veterinario } from './veterinario.entity';
import { Protectora } from 'src/protectora/protectora.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Veterinario, Protectora])],
    controllers: [VeterinarioController],
    providers: [VeterinarioService],
    exports: [TypeOrmModule]
})
export class VeterinarioModule { }