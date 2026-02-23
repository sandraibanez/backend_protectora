import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adopcion, EstadoAdopcion } from './adopcion.entity';
import { CreateAdopcionDto, UpdateAdopcionDto } from './adopcion.dto';
import { Animal } from 'src/animal/animal.entity';
import { User } from 'src/user/user.entity';
import { AppConfig } from 'src/config/app.config';

@Injectable()
export class AdopcionService {
  constructor(
    @InjectRepository(Adopcion)
    private readonly adopcionRepository: Repository<Adopcion>,

    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly appConfig: AppConfig,
  ) {}

  // Crear solicitud de adopción
  async create(dto: CreateAdopcionDto, userProtectoraId: number): Promise<Adopcion> {
    const animal = await this.animalRepository.findOne({ 
      where: { id_animal: dto.id_animal },
      relations: ['protectora']
    });
    
    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    // Validar que el animal es adoptable
    if (!animal.adoptable) {
      throw new HttpException(
        'Este animal no está disponible para adopción',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validar que el animal pertenece a la protectora de la app
    if (animal.protectora.id_protectora !== this.appConfig.protectoraId) {
      throw new HttpException(
        'No puedes solicitar adopción de animales de otra protectora',
        HttpStatus.FORBIDDEN,
      );
    }

    const adoptante = await this.userRepository.findOne({ 
      where: { id_user: dto.id_adoptante },
      relations: ['protectora']
    });
    
    if (!adoptante) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Validar que el usuario pertenece a la misma protectora
    if (!this.appConfig.belongsToAppProtectora(adoptante.protectora?.id_protectora)) {
      throw new HttpException(
        'No puedes crear adopciones en esta protectora',
        HttpStatus.FORBIDDEN,
      );
    }

    // Un animal no puede tener dos adopciones activas (pendientes o aprobadas)
    const adopcionActiva = await this.adopcionRepository.findOne({
      where: [
        { animal: { id_animal: dto.id_animal }, estado: EstadoAdopcion.PENDIENTE },
        { animal: { id_animal: dto.id_animal }, estado: EstadoAdopcion.APROBADA },
      ],
    });

    if (adopcionActiva) {
      throw new HttpException(
        'Este animal ya tiene una solicitud de adopción activa',
        HttpStatus.CONFLICT,
      );
    }

    const nueva = this.adopcionRepository.create({
      fecha_solicitud: dto.fecha_solicitud,
      estado: dto.estado ?? EstadoAdopcion.PENDIENTE,
      observaciones: dto.observaciones,
      animal,
      adoptante,
    });

    return this.adopcionRepository.save(nueva);
  }

  // Obtener todas las adopciones
  async findAll(): Promise<Adopcion[]> {
    return this.adopcionRepository.find({
      relations: ['animal', 'adoptante'],
      order: { fecha_solicitud: 'DESC' },
    });
  }

  // Obtener una adopción por ID
  async findOne(id_adopcion: number): Promise<Adopcion> {
    const adopcion = await this.adopcionRepository.findOne({
      where: { id_adopcion },
      relations: ['animal', 'animal.protectora', 'adoptante'],
    });

    if (!adopcion) {
      throw new HttpException('Adopción no encontrada', HttpStatus.NOT_FOUND);
    }

    return adopcion;
  }

  // Obtener adopciones por usuario
  async findByUsuario(idUsuario: number): Promise<Adopcion[]> {
    const usuario = await this.userRepository.findOne({
      where: { id_user: idUsuario },
    });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return this.adopcionRepository.find({
      where: { adoptante: { id_user: idUsuario } },
      relations: ['animal'],
      order: { fecha_solicitud: 'DESC' },
    });
  }

  // Obtener adopciones por animal
  async findByAnimal(idAnimal: number): Promise<Adopcion[]> {
    const animal = await this.animalRepository.findOne({
      where: { id_animal: idAnimal },
    });

    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    return this.adopcionRepository.find({
      where: { animal: { id_animal: idAnimal } },
      relations: ['adoptante'],
      order: { fecha_solicitud: 'DESC' },
    });
  }

  // Actualizar adopción
  async update(id_adopcion: number, dto: UpdateAdopcionDto): Promise<Adopcion> {
    const adopcion = await this.adopcionRepository.findOne({
      where: { id_adopcion },
      relations: ['animal', 'adoptante'],
    });

    if (!adopcion) {
      throw new HttpException('Adopción no encontrada', HttpStatus.NOT_FOUND);
    }

    // Si se cambia el estado a COMPLETADA, establecer fecha_adopcion
    if (dto.estado === EstadoAdopcion.COMPLETADA && !dto.fecha_adopcion) {
      dto.fecha_adopcion = new Date();
    }

    // Si se cambia el estado a APROBADA o RECHAZADA, establecer fecha_respuesta
    if (
      (dto.estado === EstadoAdopcion.APROBADA || dto.estado === EstadoAdopcion.RECHAZADA) &&
      !adopcion.fecha_respuesta &&
      !dto.fecha_respuesta
    ) {
      dto.fecha_respuesta = new Date();
    }

    Object.assign(adopcion, dto);

    return this.adopcionRepository.save(adopcion);
  }

  // Eliminar adopción
  async delete(id_adopcion: number): Promise<void> {
    const adopcion = await this.adopcionRepository.findOneBy({ id_adopcion });

    if (!adopcion) {
      throw new HttpException('Adopción no encontrada', HttpStatus.NOT_FOUND);
    }

    await this.adopcionRepository.remove(adopcion);
  }
}
