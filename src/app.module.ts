import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { AnimalesController } from './animales/animales.controller';
import { AnimalesModule } from './animales/animales.module';
import { AnimalesService } from './animales/animales.service';
import { Animales } from './animales/animales.entity';
import { EntidadController } from './entidad/entidad.controller';
import { EntidadService } from './entidad/entidad.service';
import { EntidadModule } from './entidad/entidad.module';
import { Entidad } from './entidad/entidad.entity';
import { MedicacionController } from './medicacion/medicacion.controller';
import { MedicacionService } from './medicacion/medicacion.service';
import { MedicacionModule } from './medicacion/medicacion.module';
import { Medicacion } from './medicacion/medicacion.entity';
import { ClinicaVeterinariaController } from './clinica_veterinaria/clinica_veterinaria.controller';
import { ClinicaVeterinariaService } from './clinica_veterinaria/clinica_veterinaria.service';
import { ClinicaVeterinariaModule } from './clinica_veterinaria/clinica_veterinaria.module';
import { Clinica_veterinaria } from './clinica_veterinaria/clinica_veterinaria.entity';

@Module({
  imports: [
    
      TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'prueva',
      entities: [User, Animales, Entidad, Medicacion, Clinica_veterinaria],
      synchronize: true,
    }),
      UsersModule,
      AnimalesModule,
      EntidadModule,
      MedicacionModule,
      ClinicaVeterinariaModule,
  ],
  controllers: [AppController, UsersController,AnimalesController, EntidadController, MedicacionController, ClinicaVeterinariaController],
  providers: [AppService, UsersService, AnimalesService, EntidadService, MedicacionService, ClinicaVeterinariaService],
  

})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

