import { Module } from '@nestjs/common';    
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AnimalController } from './animal/animal.controller';
import { AnimalModule } from './animal/animal.module';
import { AnimalService } from './animal/animal.service';
import { Animal } from './animal/animal.entity';
import { EntidadController } from './entidad/entidad.controller';
import { EntidadService } from './entidad/entidad.service';
import { EntidadModule } from './entidad/entidad.module';
import { Entidad } from './entidad/entidad.entity';
import { MedicacionController } from './medicacion/medicacion.controller';
import { MedicacionService } from './medicacion/medicacion.service';
import { MedicacionModule } from './medicacion/medicacion.module';
import { Medicacion } from './medicacion/medicacion.entity';
import { VeterinarioController } from './veterinario/veterinario.controller';
import { VeterinarioService } from './veterinario/veterinario.service';
import { VeterinarioModule } from './veterinario/veterinario.module';
import { Veterinario } from './veterinario/veterinario.entity';
import { IngresoService } from './ingreso/ingreso.service';
import { IngresosModule } from './ingreso/ingreso.module';
import { IngresoController } from './ingreso/ingreso.controller';
import { Ingreso } from './ingreso/ingreso.entity';
import { GastoService } from './gasto/gasto.service';
import { GastoModule } from './gasto/gasto.module';
import { GastoController } from './gasto/gasto.controller';
import { Gasto } from './gasto/gasto.entity';
import { Protectora } from './protectora/protectora.entity';
import { ProtectoraService } from './protectora/protectora.service';
import { ProtectoraModule } from './protectora/protectora.module';
import { ProtectoraController } from './protectora/protectora.controller';
import { Colonia } from './colonias/colonia.entity';
import { ColoniaService } from './colonias/colonia.service';
import { ColoniasModule } from './colonias/colonia.module';
import { ColoniaController } from './colonias/colonia.controller'; 
import { DonacionesViveres } from './donaciones_viveres/donaciones_viveres.entity';
import { DonacionesViveresService } from './donaciones_viveres/donaciones_viveres.service';
import { DonacionesViveresModule } from './donaciones_viveres/donaciones_viveres.module';
import { DonacionesViveresController } from './donaciones_viveres/donaciones_viveres.controller';
import { RelacionPersonaAnimalController } from './relacion_persona_animal/relacion_persona_animal.controller';
import { RelacionPersonaAnimalService } from './relacion_persona_animal/relacion_persona_animal.service';
import { RelacionPersonaAnimalModule } from './relacion_persona_animal/relacion_persona_animal.module';
import { RelacionPersonaAnimal } from './relacion_persona_animal/relacion_persona_animal.entity';
import { Animal_Entidad } from './animal_entidad/animal_entidad.entity';
import { AnimalEntidadController } from './animal_entidad/animal_entidad.controller';
import { AnimalEntidadService } from './animal_entidad/animal_entidad.service';
import { AnimalEntidadModule } from './animal_entidad/animal_entidad.module';
import { AnimalVeterinarioModule } from './animal_veterinario/animal_veterinario.module';
import { AnimalVeterinarioController } from './animal_veterinario/animal_veterinario.controller';
import { AnimalVeterinarioService } from './animal_veterinario/animal_veterinario.service';
import { AnimalVeterinario } from './animal_veterinario/animal_veterinario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
       type: 'mariadb',
      host: 'database',
      // port: 2222,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, Animal, Entidad, Medicacion, Veterinario, Ingreso, Gasto, Protectora, Colonia, DonacionesViveres, RelacionPersonaAnimal, Animal_Entidad, AnimalVeterinario],
      synchronize: false,
    }),
    UserModule,
    EntidadModule,
    MedicacionModule,
    VeterinarioModule,
    IngresosModule,
    GastoModule,
    ProtectoraModule,
    ColoniasModule,
    DonacionesViveresModule,
    RelacionPersonaAnimalModule,
    AnimalEntidadModule,
    AnimalVeterinarioModule, 
    AnimalModule
  ],

  controllers: [
    AppController,
    UserController,
    IngresoController,
    GastoController,
    ProtectoraController,
    ColoniaController,
    AnimalController,
    DonacionesViveresController,
    EntidadController,
    MedicacionController,
    VeterinarioController,
    RelacionPersonaAnimalController,
    AnimalEntidadController,
    AnimalVeterinarioController
  ],

  providers: [
    AppService,
    UserService,
    IngresoService,
    GastoService,
    ProtectoraService,
    ColoniaService,
    AnimalService,
    DonacionesViveresService,
    EntidadService,
    MedicacionService,
    VeterinarioService,
    RelacionPersonaAnimalService,
    AnimalEntidadService,
    AnimalVeterinarioService
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
