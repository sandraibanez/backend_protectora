import { Module } from '@nestjs/common';    
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { Animales } from './animales/animales.entity';
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
import { AnimalesService } from './animales/animales.service';
import { AnimalesModule } from './animales/animales.module';
import { AnimalesController } from './animales/animales.controller';  
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
      entities: [Users, Animales, Ingresos, Gastos, Protectoras, Colonias, DonacionesViveres],
      synchronize: true,
    }),
      UsersModule,
      IngresosModule,
      GastosModule,
      ProtectorasModule,
      ColoniasModule,
      AnimalesModule,
      DonacionesViveresModule
  ],
  controllers: [AppController, IngresosController, GastosController, ProtectorasController, ColoniasController, AnimalesController, DonacionesViveresController],
  providers: [AppService, IngresosService, GastosService, ProtectorasService, ColoniasService, AnimalesService, DonacionesViveresService],
  

})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

