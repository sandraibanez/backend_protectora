import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolUsuario, User } from './user.entity';
import { AdminUpdateUserDto, CreateUserDto, UpdateUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // Obtener todos los usuarios
  findAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  // Obtener un usuario por ID
  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id_user: id });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // Obtener el usuario propio pero devuelve menos informacion
  async getUserClient(id: number): Promise<{
    id_user: number;
    nombre: string;
    email: string;
    telefono: number;
    direccion: string;
    DNI: string;
    rol: string;
  }> {
    const user = await this.userRepository.findOneBy({ id_user: id });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return {
      id_user: user.id_user,
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono,
      direccion: user.direccion,
      DNI: user.DNI,
      rol: user.rol,
    };
  }


  // Crear un nuevo usuario
  async createUser(createUserDto: CreateUserDto): Promise<User> {

    // Verificar si el email ya está registrado en ESTA protectora
    const existeUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
        protectora: { id_protectora: createUserDto.protectora }
      },
      relations: ['protectora']
    });

    if (existeUser) {
      throw new HttpException(
        'El email ya está registrado en esta protectora',
        HttpStatus.BAD_REQUEST
      );
    }

    // Crear usuario SIN la protectora (porque es un number) 
    const { protectora, ...resto } = createUserDto; 
    const newUser = this.userRepository.create(resto);

    // Asignar la protectora como relación ManyToOne
    newUser.protectora = { id_protectora: protectora } as any;

    // Hashear la contraseña
    const saltOrRounds = 10;
    newUser.contrasenya = await bcrypt.hash(createUserDto.contrasenya, saltOrRounds);

    return this.userRepository.save(newUser);
  }



  // Actualizar un usuario existente
  async updateUser(id_user: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id_user },
      relations: ['protectora']
    });


    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Filtrar campos vacíos ("") a undefined 
    Object.keys(updateUserDto).forEach((key) => { 
      if (updateUserDto[key] === '') { 
        updateUserDto[key] = undefined; 
      } 
    });

    // Evitar duplicar email de otro usuario
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.userRepository.findOne({
        where: {
          email: updateUserDto.email,
          protectora: { id_protectora: user.protectora.id_protectora }
        },
        relations: ['protectora']
      });

      if (existingEmail) {
        throw new HttpException(
          'El email ya está registrado en esta protectora',
          HttpStatus.BAD_REQUEST,
        );
      }
    }


    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  // Actualizar un usuario existente
  async adminUpdateUser(id_user: number, updateUserDto: AdminUpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id_user },
      relations: ['protectora']
    });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Filtrar campos vacíos ("") a undefined 
    Object.keys(updateUserDto).forEach((key) => { 
      if (updateUserDto[key] === '') { 
        updateUserDto[key] = undefined; 
      } 
    });

    // Evitar duplicar email de otro usuario
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.userRepository.findOne({
        where: {
          email: updateUserDto.email,
          protectora: { id_protectora: user.protectora.id_protectora }
        },
        relations: ['protectora']
      });

      if (existingEmail) {
        throw new HttpException(
          'El email ya está registrado en esta protectora',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // Si el admin envía una nueva contraseña
    if (updateUserDto.newPassword) { 
      const hashedPassword = await bcrypt.hash(updateUserDto.newPassword, 10); 
      user.contrasenya = hashedPassword; 
    }

    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  // Actualizar un contraseña
  async updatePassword(id_user: number, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id_user });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar contraseña actual
    const passwordMatch = await bcrypt.compare(currentPassword, user.contrasenya);
    if (!passwordMatch) {
      throw new HttpException('La contraseña actual es incorrecta', HttpStatus.BAD_REQUEST);
    }

    // Hashear nueva contraseña
    const saltOrRounds = 10;
    user.contrasenya = await bcrypt.hash(newPassword, saltOrRounds);

    await this.userRepository.save(user);
  }


  // Eliminar un usuario con comprobación
  async deleteUser(id_user: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id_user });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(id_user);
  }
}

