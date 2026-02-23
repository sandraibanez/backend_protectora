import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialMedico } from './historial_medico.entity';
import { CreateHistorialMedicoDto, UpdateHistorialMedicoDto } from './historial_medico.dto';
import { Animal } from 'src/animal/animal.entity';
import { User, RolUsuario } from 'src/user/user.entity';
import { AppConfig } from 'src/config/app.config';

@Injectable()
export class HistorialMedicoService {
  constructor(
    @InjectRepository(HistorialMedico)
    private readonly historialRepository: Repository<HistorialMedico>,

    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly appConfig: AppConfig,
  ) {}

  // Crear registro médico
  async create(dto: CreateHistorialMedicoDto, userProtectoraId: number): Promise<HistorialMedico> {
    const animal = await this.animalRepository.findOne({ 
      where: { id_animal: dto.id_animal },
      relations: ['protectora']
    });
    
    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    // Validar que el animal pertenece a la protectora de la app
    if (animal.protectora.id_protectora !== this.appConfig.protectoraId) {
      throw new HttpException(
        'No puedes crear registros médicos de animales de otra protectora',
        HttpStatus.FORBIDDEN,
      );
    }

    const veterinario = await this.userRepository.findOne({ 
      where: { id_user: dto.id_veterinario },
      relations: ['protectora']
    });
    
    if (!veterinario) {
      throw new HttpException('Veterinario no encontrado', HttpStatus.NOT_FOUND);
    }

    if (veterinario.rol !== RolUsuario.VETERINARIO) {
      throw new HttpException('El usuario no es veterinario', HttpStatus.BAD_REQUEST);
    }

    // Validar que el veterinario pertenece a la misma protectora
    if (!this.appConfig.belongsToAppProtectora(veterinario.protectora?.id_protectora)) {
      throw new HttpException(
        'El veterinario no pertenece a esta protectora',
        HttpStatus.FORBIDDEN,
      );
    }

    const nuevoRegistro = this.historialRepository.create({
      fecha: dto.fecha,
      motivo_consulta: dto.motivo_consulta,
      diagnostico: dto.diagnostico,
      tratamiento: dto.tratamiento,
      medicamentos: dto.medicamentos,
      en_tratamiento: dto.en_tratamiento,
      observaciones: dto.observaciones,
      animal,
      veterinario,
    });

    return this.historialRepository.save(nuevoRegistro);
  }

  // Obtener todos los registros (solo admin)
  async findAll(): Promise<HistorialMedico[]> {
    return this.historialRepository.find({
      relations: ['animal', 'veterinario'],
    });
  }

  // Obtener un registro por ID
  async findOne(id_registro: number): Promise<HistorialMedico> {
    const registro = await this.historialRepository.findOne({
      where: { id_registro },
      relations: ['animal', 'animal.protectora', 'veterinario'],
    });

    if (!registro) {
      throw new HttpException('Registro médico no encontrado', HttpStatus.NOT_FOUND);
    }

    return registro;
  }

  // Obtener historial médico de un animal
  async findByAnimal(idAnimal: number): Promise<HistorialMedico[]> {
    const animal = await this.animalRepository.findOne({
      where: { id_animal: idAnimal },
    });

    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    return this.historialRepository.find({
      where: { animal: { id_animal: idAnimal } },
      relations: ['veterinario', 'animal'],
      order: { fecha: 'DESC' },
    });
  }

  // Obtener animales en tratamiento activo
  async findAnimalesEnTratamiento(idProtectora?: number): Promise<HistorialMedico[]> {
    const query = this.historialRepository
      .createQueryBuilder('historial')
      .leftJoinAndSelect('historial.animal', 'animal')
      .leftJoinAndSelect('animal.protectora', 'protectora')
      .leftJoinAndSelect('historial.veterinario', 'veterinario')
      .where('historial.en_tratamiento = :value', { value: true });

    if (idProtectora) {
      query.andWhere('protectora.id_protectora = :idProtectora', { idProtectora });
    }

    return query.orderBy('historial.fecha', 'DESC').getMany();
  }

  // Actualizar registro
  async update(id_registro: number, dto: UpdateHistorialMedicoDto): Promise<HistorialMedico> {
    const registro = await this.historialRepository.findOne({
      where: { id_registro },
      relations: ['animal', 'veterinario'],
    });

    if (!registro) {
      throw new HttpException('Registro médico no encontrado', HttpStatus.NOT_FOUND);
    }

    // Actualizar solo campos proporcionados
    if (dto.fecha !== undefined) registro.fecha = dto.fecha;
    if (dto.motivo_consulta !== undefined) registro.motivo_consulta = dto.motivo_consulta;
    if (dto.diagnostico !== undefined) registro.diagnostico = dto.diagnostico;
    if (dto.tratamiento !== undefined) registro.tratamiento = dto.tratamiento;
    if (dto.medicamentos !== undefined) registro.medicamentos = dto.medicamentos;
    if (dto.en_tratamiento !== undefined) registro.en_tratamiento = dto.en_tratamiento;
    if (dto.observaciones !== undefined) registro.observaciones = dto.observaciones;

    // Actualizar animal si se proporciona
    if (dto.id_animal) {
      const animal = await this.animalRepository.findOneBy({ id_animal: dto.id_animal });
      if (!animal) {
        throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
      }
      registro.animal = animal;
    }

    // Actualizar veterinario si se proporciona
    if (dto.id_veterinario) {
      const veterinario = await this.userRepository.findOneBy({ id_user: dto.id_veterinario });
      if (!veterinario || veterinario.rol !== RolUsuario.VETERINARIO) {
        throw new HttpException('Veterinario no encontrado', HttpStatus.NOT_FOUND);
      }
      registro.veterinario = veterinario;
    }

    return this.historialRepository.save(registro);
  }

  // Eliminar registro
  async delete(id_registro: number): Promise<void> {
    const registro = await this.historialRepository.findOneBy({ id_registro });

    if (!registro) {
      throw new HttpException('Registro médico no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.historialRepository.remove(registro);
  }
}
