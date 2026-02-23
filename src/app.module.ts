import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { User } from './user/user.entity';
import { Animal } from './animal/animal.entity';
import { Entidad } from './entidad/entidad.entity';
import { Ingreso } from './ingreso/ingreso.entity';
import { Protectora } from './protectora/protectora.entity';
import { Colonia } from './colonias/colonia.entity';
import { DonacionesViveres } from './donaciones_viveres/donaciones_viveres.entity';
import { Animal_Entidad } from './animal_entidad/animal_entidad.entity';
import { Acogida } from './acogida/acogida.entity';
import { Apadrinamiento } from './apadrinamiento/apadrinamiento.entity';
import { Adopcion } from './adopcion/adopcion.entity';
import { HistorialMedico } from './historial_medico/historial_medico.entity';
import { Noticia } from './noticia/noticia.entity';

import { UserModule } from './user/user.module';
import { AnimalModule } from './animal/animal.module';
import { EntidadModule } from './entidad/entidad.module';
import { IngresosModule } from './ingreso/ingreso.module';
import { ProtectoraModule } from './protectora/protectora.module';
import { ColoniasModule } from './colonias/colonia.module';
import { DonacionesViveresModule } from './donaciones_viveres/donaciones_viveres.module';
import { AnimalEntidadModule } from './animal_entidad/animal_entidad.module';
import { AuthModule } from './authentication/auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AcogidaModule } from './acogida/acogida.module';
import { ApadrinamientoModule } from './apadrinamiento/apadrinamiento.module';
import { AdopcionModule } from './adopcion/adopcion.module';
import { HistorialMedicoModule } from './historial_medico/historial_medico.module';
import { NoticiaModule } from './noticia/noticia.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';
import { AppConfig } from './config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'database',
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      // host: 'localhost',
      // port: 2222,
      // username: 'root',
      // password: '1234',
      // database: "backend",
      entities: [
        User, 
        Animal, 
        Entidad, 
        Ingreso, 
        Protectora, 
        Colonia, 
        DonacionesViveres, 
        Animal_Entidad, 
        Acogida, 
        Apadrinamiento, 
        Adopcion,
        HistorialMedico,
        Noticia
      ],

      synchronize: false,
    }),

    UserModule,
    AnimalModule,
    EntidadModule,
    IngresosModule,
    ProtectoraModule,
    ColoniasModule,
    DonacionesViveresModule,
    AnimalEntidadModule,
    AuthModule,
    AcogidaModule,
    ApadrinamientoModule,
    AdopcionModule,
    HistorialMedicoModule,
    NoticiaModule,
    EstadisticasModule
  ],

  controllers: [AppController],
  providers: [AppService, AppConfig],
})

export class AppModule implements NestModule { 
  constructor(private dataSource: DataSource) {}

  // Middleware LOGS
  configure(consumer: MiddlewareConsumer) { 
    consumer 
    .apply(LoggerMiddleware) 

    // aplica a TODAS las rutas 
    .forRoutes('*'); 
  } 
}
