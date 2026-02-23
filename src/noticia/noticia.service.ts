import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Noticia } from './noticia.entity';
import { CreateNoticiaDto, UpdateNoticiaDto } from './noticia.dto';
import { Protectora } from 'src/protectora/protectora.entity';
import { User } from 'src/user/user.entity';
import { AppConfig } from 'src/config/app.config';

@Injectable()
export class NoticiaService {
  constructor(
    @InjectRepository(Noticia)
    private readonly noticiaRepository: Repository<Noticia>,

    @InjectRepository(Protectora)
    private readonly protectoraRepository: Repository<Protectora>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private appConfig: AppConfig,
  ) {}

  // Crear noticia
  async create(dto: CreateNoticiaDto): Promise<Noticia> {
    const protectora = await this.protectoraRepository.findOne({
      where: { id_protectora: dto.id_protectora },
    });

    if (!protectora) {
      throw new HttpException('Protectora no encontrada', HttpStatus.NOT_FOUND);
    }

    const autor = await this.userRepository.findOne({
      where: { id_user: dto.id_user },
    });

    if (!autor) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const nueva = this.noticiaRepository.create({
      titulo: dto.titulo,
      contenido: dto.contenido,
      imagen: dto.imagen,
      publicada: dto.publicada ?? true,
      protectora,
      autor,
    });

    return this.noticiaRepository.save(nueva);
  }

  // Obtener todas las noticias
  async findAll(): Promise<Noticia[]> {
    return this.noticiaRepository.find({
      relations: ['protectora', 'autor'],
      order: { fecha_publicacion: 'DESC' },
    });
  }

  // Obtener noticias publicadas de la protectora de esta app (público)
  async findPublicadasDeApp(): Promise<Noticia[]> {
    const protectoraId = this.appConfig.protectoraId;
    
    return this.noticiaRepository.find({
      where: { 
        publicada: true,
        protectora: { id_protectora: protectoraId }
      },
      relations: ['protectora', 'autor'],
      order: { fecha_publicacion: 'DESC' },
    });
  }

  // Obtener noticias publicadas (público - todas las protectoras, solo admin)
  async findPublicadas(): Promise<Noticia[]> {
    return this.noticiaRepository.find({
      where: { publicada: true },
      relations: ['protectora', 'autor'],
      order: { fecha_publicacion: 'DESC' },
    });
  }

  // Obtener noticias por protectora
  async findByProtectora(id_protectora: number): Promise<Noticia[]> {
    const protectora = await this.protectoraRepository.findOne({
      where: { id_protectora },
    });

    if (!protectora) {
      throw new HttpException('Protectora no encontrada', HttpStatus.NOT_FOUND);
    }

    return this.noticiaRepository.find({
      where: { protectora: { id_protectora } },
      relations: ['protectora', 'autor'],
      order: { fecha_publicacion: 'DESC' },
    });
  }

  // Obtener noticia por ID
  async findOne(id: number): Promise<Noticia> {
    const noticia = await this.noticiaRepository.findOne({
      where: { id_noticia: id },
      relations: ['protectora', 'autor'],
    });

    if (!noticia) {
      throw new HttpException('Noticia no encontrada', HttpStatus.NOT_FOUND);
    }

    return noticia;
  }

  // Actualizar noticia
  async update(id: number, dto: UpdateNoticiaDto): Promise<Noticia> {
    const noticia = await this.findOne(id);

    if (dto.id_protectora) {
      const protectora = await this.protectoraRepository.findOne({
        where: { id_protectora: dto.id_protectora },
      });
      if (!protectora) {
        throw new HttpException('Protectora no encontrada', HttpStatus.NOT_FOUND);
      }
      noticia.protectora = protectora;
    }

    if (dto.id_user) {
      const autor = await this.userRepository.findOne({
        where: { id_user: dto.id_user },
      });
      if (!autor) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      noticia.autor = autor;
    }

    Object.assign(noticia, dto);

    return this.noticiaRepository.save(noticia);
  }

  // Eliminar noticia
  async delete(id: number): Promise<void> {
    const noticia = await this.findOne(id);
    await this.noticiaRepository.remove(noticia);
  }
}
