import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { Animal } from './users/animal.entity';


@Module({
  imports: [
    
      TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'prueva',
      entities: [User, Animal],
      synchronize: true,
    }),
      UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  

})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

