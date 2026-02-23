import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Not } from 'typeorm';
import { Animal } from 'src/animal/animal.entity';
import { Ingreso } from 'src/ingreso/ingreso.entity';
import { Acogida, EstadoAcogida } from 'src/acogida/acogida.entity';
import { Apadrinamiento } from 'src/apadrinamiento/apadrinamiento.entity';
import { Adopcion, EstadoAdopcion } from 'src/adopcion/adopcion.entity';
import { Colonia } from 'src/colonias/colonia.entity';
import { HistorialMedico } from 'src/historial_medico/historial_medico.entity';
import { AppConfig } from 'src/config/app.config';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,

    @InjectRepository(Ingreso)
    private readonly ingresoRepository: Repository<Ingreso>,

    @InjectRepository(Acogida)
    private readonly acogidaRepository: Repository<Acogida>,

    @InjectRepository(Apadrinamiento)
    private readonly apadrinamientoRepository: Repository<Apadrinamiento>,

    @InjectRepository(Adopcion)
    private readonly adopcionRepository: Repository<Adopcion>,

    @InjectRepository(Colonia)
    private readonly coloniaRepository: Repository<Colonia>,

    @InjectRepository(HistorialMedico)
    private readonly historialMedicoRepository: Repository<HistorialMedico>,

    private readonly appConfig: AppConfig,
  ) {}

  // Estadísticas generales de la protectora
  async getEstadisticasGenerales() {
    const protectoraId = this.appConfig.protectoraId;

    const totalAnimales = await this.animalRepository.count({
      where: { protectora: { id_protectora: protectoraId } },
    });

    const animalesAdoptables = await this.animalRepository.count({
      where: {
        protectora: { id_protectora: protectoraId },
        adoptable: true,
      },
    });

    const animalesCastrados = await this.animalRepository.count({
      where: {
        protectora: { id_protectora: protectoraId },
        esterilizado: true,
      },
    });

    const totalColonias = await this.coloniaRepository.count({
      where: { protectora: { id_protectora: protectoraId } },
    });

    const adopcionesCompletadas = await this.adopcionRepository.count({
      where: {
        animal: { protectora: { id_protectora: protectoraId } },
        estado: EstadoAdopcion.COMPLETADA,
      },
      relations: ['animal', 'animal.protectora'],
    });

    const acogidaActivas = await this.acogidaRepository.count({
      where: {
        animal: { protectora: { id_protectora: protectoraId } },
        estado: Not(EstadoAcogida.FINALIZADA),
      },
      relations: ['animal', 'animal.protectora'],
    });

    const apadrinamientosActivos = await this.apadrinamientoRepository.count({
      where: {
        animal: { protectora: { id_protectora: protectoraId } },
        activo: true,
      },
      relations: ['animal', 'animal.protectora'],
    });

    return {
      totalAnimales,
      animalesAdoptables,
      animalesCastrados,
      totalColonias,
      adopcionesCompletadas,
      acogidaActivas,
      apadrinamientosActivos,
    };
  }

  // Estadísticas de animales por estado
  async getEstadisticasAnimales() {
    const protectoraId = this.appConfig.protectoraId;

    const totalAnimales = await this.animalRepository.count({
      where: { protectora: { id_protectora: protectoraId } },
    });

    const adoptables = await this.animalRepository.count({
      where: {
        protectora: { id_protectora: protectoraId },
        adoptable: true,
      },
    });

    const castrados = await this.animalRepository.count({
      where: {
        protectora: { id_protectora: protectoraId },
        esterilizado: true,
      },
    });

    // Animales en tratamiento médico activo
    const animalesIdsEnTratamiento = await this.historialMedicoRepository
      .createQueryBuilder('historial')
      .select('DISTINCT historial.animalIdAnimal')
      .innerJoin('historial.animal', 'animal')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .andWhere('historial.en_tratamiento = true')
      .getRawMany();

    const enTratamiento = animalesIdsEnTratamiento.length;

    // Contar animales por especie
    const porEspecie = await this.animalRepository
      .createQueryBuilder('animal')
      .select('animal.especie', 'especie')
      .addSelect('COUNT(*)', 'cantidad')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .groupBy('animal.especie')
      .getRawMany();

    // Contar animales por sexo
    const porSexo = await this.animalRepository
      .createQueryBuilder('animal')
      .select('animal.sexo', 'sexo')
      .addSelect('COUNT(*)', 'cantidad')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .groupBy('animal.sexo')
      .getRawMany();

    return {
      totalAnimales,
      adoptables,
      castrados,
      enTratamiento,
      porEspecie,
      porSexo,
    };
  }

  // Estadísticas de donaciones económicas
  async getEstadisticasDonaciones(mes?: number, anio?: number) {
    const protectoraId = this.appConfig.protectoraId;

    let whereCondition: any = {
      protectora: { id_protectora: protectoraId },
    };

    // Filtrar por mes y año si se proporcionan
    if (mes && anio) {
      const fechaInicio = new Date(anio, mes - 1, 1);
      const fechaFin = new Date(anio, mes, 0, 23, 59, 59);
      whereCondition.fecha = Between(fechaInicio, fechaFin);
    } else if (anio) {
      const fechaInicio = new Date(anio, 0, 1);
      const fechaFin = new Date(anio, 11, 31, 23, 59, 59);
      whereCondition.fecha = Between(fechaInicio, fechaFin);
    }

    const ingresos = await this.ingresoRepository.find({
      where: whereCondition,
    });

    const totalDonaciones = ingresos.length;
    const totalImporte = ingresos.reduce((sum, ingreso) => sum + Number(ingreso.cantidad), 0);

    // Agrupar por mes
    const porMes = await this.ingresoRepository
      .createQueryBuilder('ingreso')
      .select('MONTH(ingreso.fecha)', 'mes')
      .addSelect('YEAR(ingreso.fecha)', 'anio')
      .addSelect('COUNT(*)', 'cantidad')
      .addSelect('SUM(ingreso.cantidad)', 'total')
      .innerJoin('ingreso.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .groupBy('YEAR(ingreso.fecha), MONTH(ingreso.fecha)')
      .orderBy('YEAR(ingreso.fecha)', 'DESC')
      .addOrderBy('MONTH(ingreso.fecha)', 'DESC')
      .limit(12) // Últimos 12 meses
      .getRawMany();

    return {
      totalDonaciones,
      totalImporte,
      porMes,
    };
  }

  // Estadísticas de acogidas
  async getEstadisticasAcogidas() {
    const protectoraId = this.appConfig.protectoraId;

    const totalAcogidas = await this.acogidaRepository
      .createQueryBuilder('acogida')
      .innerJoin('acogida.animal', 'animal')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .getCount();

    const acogidaActivas = await this.acogidaRepository
      .createQueryBuilder('acogida')
      .innerJoin('acogida.animal', 'animal')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .andWhere('acogida.estado != :estado', { estado: EstadoAcogida.FINALIZADA })
      .getCount();

    const acogidaFinalizadas = totalAcogidas - acogidaActivas;

    return {
      totalAcogidas,
      acogidaActivas,
      acogidaFinalizadas,
    };
  }

  // Estadísticas de apadrinamientos
  async getEstadisticasApadrinamientos() {
    const protectoraId = this.appConfig.protectoraId;

    const totalApadrinamientos = await this.apadrinamientoRepository
      .createQueryBuilder('apadrinamiento')
      .innerJoin('apadrinamiento.animal', 'animal')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .getCount();

    const apadrinamientosActivos = await this.apadrinamientoRepository
      .createQueryBuilder('apadrinamiento')
      .innerJoin('apadrinamiento.animal', 'animal')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .andWhere('apadrinamiento.activo = true')
      .getCount();

    const apadrinamientosFinalizados = totalApadrinamientos - apadrinamientosActivos;

    // Animales más apadrinados
    const masApadrinados = await this.apadrinamientoRepository
      .createQueryBuilder('apadrinamiento')
      .select('animal.id_animal', 'id_animal')
      .addSelect('animal.nombre', 'nombre')
      .addSelect('COUNT(*)', 'total_apadrinamientos')
      .innerJoin('apadrinamiento.animal', 'animal')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .groupBy('animal.id_animal, animal.nombre')
      .orderBy('total_apadrinamientos', 'DESC')
      .limit(5)
      .getRawMany();

    return {
      totalApadrinamientos,
      apadrinamientosActivos,
      apadrinamientosFinalizados,
      animalesMasApadrinados: masApadrinados,
    };
  }

  // Estadísticas de adopciones
  async getEstadisticasAdopciones() {
    const protectoraId = this.appConfig.protectoraId;

    const totalAdopciones = await this.adopcionRepository
      .createQueryBuilder('adopcion')
      .innerJoin('adopcion.animal', 'animal')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .getCount();

    const pendientes = await this.adopcionRepository
      .createQueryBuilder('adopcion')
      .innerJoin('adopcion.animal', 'animal')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .andWhere('adopcion.estado = :estado', { estado: EstadoAdopcion.PENDIENTE })
      .getCount();

    const aprobadas = await this.adopcionRepository
      .createQueryBuilder('adopcion')
      .innerJoin('adopcion.animal', 'animal')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .andWhere('adopcion.estado = :estado', { estado: EstadoAdopcion.APROBADA })
      .getCount();

    const completadas = await this.adopcionRepository
      .createQueryBuilder('adopcion')
      .innerJoin('adopcion.animal', 'animal')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .andWhere('adopcion.estado = :estado', { estado: EstadoAdopcion.COMPLETADA })
      .getCount();

    const rechazadas = await this.adopcionRepository
      .createQueryBuilder('adopcion')
      .innerJoin('adopcion.animal', 'animal')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .andWhere('adopcion.estado = :estado', { estado: EstadoAdopcion.RECHAZADA })
      .getCount();

    return {
      totalAdopciones,
      pendientes,
      aprobadas,
      completadas,
      rechazadas,
    };
  }

  // Estadísticas de colonias
  async getEstadisticasColonias() {
    const protectoraId = this.appConfig.protectoraId;

    const totalColonias = await this.coloniaRepository.count({
      where: { protectora: { id_protectora: protectoraId } },
    });

    // Contar total de gatos en colonias
    const totalGatosEnColonias = await this.animalRepository
      .createQueryBuilder('animal')
      .innerJoin('animal.colonia', 'colonia')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .andWhere('animal.colonia IS NOT NULL')
      .getCount();

    // Contar gatos castrados en colonias
    const gatosCastradosEnColonias = await this.animalRepository
      .createQueryBuilder('animal')
      .innerJoin('animal.colonia', 'colonia')
      .innerJoin('animal.protectora', 'protectora')
      .where('protectora.id_protectora = :protectoraId', { protectoraId })
      .andWhere('animal.colonia IS NOT NULL')
      .andWhere('animal.esterilizado = true')
      .getCount();

    const porcentajeCastrados =
      totalGatosEnColonias > 0
        ? Math.round((gatosCastradosEnColonias / totalGatosEnColonias) * 100)
        : 0;

    return {
      totalColonias,
      totalGatosEnColonias,
      gatosCastradosEnColonias,
      porcentajeCastrados,
    };
  }
}
