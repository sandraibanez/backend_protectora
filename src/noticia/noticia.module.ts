import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticia } from './noticia.entity';
import { NoticiaController } from './noticia.controller';
import { NoticiaService } from './noticia.service';
import { Protectora } from 'src/protectora/protectora.entity';
import { User } from 'src/user/user.entity';
import { AppConfig } from 'src/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Noticia,
      Protectora,
      User,
    ])
  ],
  controllers: [NoticiaController],
  providers: [NoticiaService, AppConfig],
  exports: [TypeOrmModule],
})
export class NoticiaModule {}
