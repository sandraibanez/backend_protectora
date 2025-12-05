import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { User } from './user/user.entity';
import { Animal } from './animal/animal.entity';
import { Entidad } from './entidad/entidad.entity';
import { Medicacion } from './medicacion/medicacion.entity';
import { Veterinario } from './veterinario/veterinario.entity';
import { Ingreso } from './ingreso/ingreso.entity';
import { Gasto } from './gasto/gasto.entity';
import { Protectora } from './protectora/protectora.entity';
import { Colonia } from './colonias/colonia.entity';
import { DonacionesViveres } from './donaciones_viveres/donaciones_viveres.entity';
import { RelacionPersonaAnimal } from './relacion_persona_animal/relacion_persona_animal.entity';
import { Animal_Entidad } from './animal_entidad/animal_entidad.entity';
import { AnimalVeterinario } from './animal_veterinario/animal_veterinario.entity';

import { UserModule } from './user/user.module';
import { AnimalModule } from './animal/animal.module';
import { EntidadModule } from './entidad/entidad.module';
import { MedicacionModule } from './medicacion/medicacion.module';
import { VeterinarioModule } from './veterinario/veterinario.module';
import { IngresosModule } from './ingreso/ingreso.module';
import { GastoModule } from './gasto/gasto.module';
import { ProtectoraModule } from './protectora/protectora.module';
import { ColoniasModule } from './colonias/colonia.module';
import { DonacionesViveresModule } from './donaciones_viveres/donaciones_viveres.module';
import { RelacionPersonaAnimalModule } from './relacion_persona_animal/relacion_persona_animal.module';
import { AnimalEntidadModule } from './animal_entidad/animal_entidad.module';
import { AnimalVeterinarioModule } from './animal_veterinario/animal_veterinario.module';
import { AuthModule } from './authentication/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      // host: 'database',
      host: 'localhost',
      port: 2222,
      // port: parseInt(process.env.DB_PORT ?? '3306'),
      // username: process.env.MYSQL_USER,
      // password: process.env.MYSQL_PASSWORD,
      // database: process.env.MYSQL_DATABASE,
      username: 'root',
      password: '1234',
      database: "backend",
      entities: [User, Animal, Entidad, Medicacion, Veterinario, Ingreso, Gasto, Protectora, Colonia, DonacionesViveres, RelacionPersonaAnimal, Animal_Entidad, AnimalVeterinario],
      synchronize: false,
    }),

    UserModule,
    AnimalModule,
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
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
