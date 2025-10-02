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
import { IngresosService } from './ingresos/ingresos.service';
import { IngresosModule } from './ingresos/ingresos.module';
import { IngresosController } from './ingresos/ingresos.controller';
import { Ingresos } from './ingresos/ingresos.entity';
import { GastosService } from './gastos/gastos.service';
import { GastosModule } from './gastos/gastos.module';
import { GastosController } from './gastos/gastos.controller';
import { Gastos } from './gastos/gastos.entity';
import { Protectoras } from './protectoras/protectoras.entity';
import { ProtectorasService } from './protectoras/protectoras.service';
import { ProtectorasModule } from './protectoras/protectoras.module';
import { ProtectorasController } from './protectoras/protectoras.controller';
import { Colonias } from './colonias/colonias.entity';
import { ColoniasService } from './colonias/colonias.service';
import { ColoniasModule } from './colonias/colonias.module';
import { ColoniasController } from './colonias/colonias.controller'; 
import { DonacionesViveres } from './donaciones_viveres/donaciones_viveres.entity';
import { DonacionesViveresService } from './donaciones_viveres/donaciones_viveres.service';
import { DonacionesViveresModule } from './donaciones_viveres/donaciones_viveres.module';
import { DonacionesViveresController } from './donaciones_viveres/donaciones_viveres.controller';


@Module({
  imports: [
    
      TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'prueva',
      entities: [User, Animales, Entidad, Medicacion, Clinica_veterinaria, Ingresos, Gastos, Protectoras, Colonias, DonacionesViveres],
      synchronize: true,
    }),
      UsersModule,
      AnimalesModule,
      EntidadModule,
      MedicacionModule,
      ClinicaVeterinariaModule,
      IngresosModule,
      GastosModule,
      ProtectorasModule,
      ColoniasModule,
      AnimalesModule,
      DonacionesViveresModule
  ],

  controllers: [AppController, IngresosController, GastosController, ProtectorasController, ColoniasController, AnimalesController, DonacionesViveresController, EntidadController, MedicacionController, ClinicaVeterinariaController],
  providers: [AppService, IngresosService, GastosService, ProtectorasService, ColoniasService, AnimalesService, DonacionesViveresService, EntidadService, MedicacionService, ClinicaVeterinariaService],
  

})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

