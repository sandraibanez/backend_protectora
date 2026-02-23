import { DataSource } from 'typeorm';
import { Protectora } from './protectora/protectora.entity';
import { User, RolUsuario } from './user/user.entity';
import { Animal } from './animal/animal.entity';
import { Entidad } from './entidad/entidad.entity';
import { Ingreso } from './ingreso/ingreso.entity';
import { Colonia } from './colonias/colonia.entity';
import { DonacionesViveres } from './donaciones_viveres/donaciones_viveres.entity';
import { Animal_Entidad } from './animal_entidad/animal_entidad.entity';
import { Acogida } from './acogida/acogida.entity';
import { Apadrinamiento } from './apadrinamiento/apadrinamiento.entity';
import { Adopcion } from './adopcion/adopcion.entity';
import { HistorialMedico } from './historial_medico/historial_medico.entity';
import { Noticia } from './noticia/noticia.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  const dataSource = new DataSource({
    type: 'mariadb',
    host: 'database',
    port: 3306,
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '1234',
    database: process.env.MYSQL_DATABASE || 'backend',
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
      Noticia,
    ],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('Conexión a la base de datos establecida');

    const protectoraRepository = dataSource.getRepository(Protectora);
    const userRepository = dataSource.getRepository(User);

    // Verificar si ya existe la protectora
    const existingProtectora = await protectoraRepository.findOne({
      where: { id_protectora: 1 },
    });

    if (existingProtectora) {
      console.log('La protectora ya existe, saltando seed de protectora');
    } else {
      // Crear protectora inicial
      const protectora = new Protectora();
      protectora.nombre = 'Protectora Patitas Felices';
      protectora.direccion = 'Calle de la Esperanza 45, Valencia';
      protectora.telefono = 962345678;

      await protectoraRepository.save(protectora);
      console.log('Protectora creada exitosamente');
    }

    // Verificar si existe el usuario admin
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@protectora.com' },
    });

    if (existingAdmin) {
      console.log('Usuario admin ya existe');
    } else {
      // Crear usuario administrador
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const protectora = await protectoraRepository.findOne({
        where: { id_protectora: 1 },
      });

      if (!protectora) {
        throw new Error('No se encontró la protectora con id 1');
      }

      const admin = new User();
      admin.nombre = 'Administrador';
      admin.contrasenya = hashedPassword;
      admin.direccion = 'Calle Admin 1';
      admin.email = 'admin@protectora.com';
      admin.telefono = 600000000;
      admin.DNI = '00000000A';
      admin.rol = RolUsuario.ADMIN;
      admin.protectora = protectora;

      await userRepository.save(admin);
      console.log('Usuario admin creado exitosamente');
      console.log('  Email: admin@protectora.com');
      console.log('  Contraseña: admin123');
    }

    console.log('\nSeeds ejecutados correctamente');
  } catch (error) {
    console.error('Error ejecutando seeds:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed();
