import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolUsuario, User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';

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

  // Obtener un usuario por ID pero devuelve menos informacion por si un usuario quiere consular informacion de otro usuario
  async getUserClient(id: number): Promise<{ nombre: string; email: string, telefono: number }> {
   const user = await this.userRepository.findOneBy({ id_user: id });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return {
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono
    };
  }

  // Crear un nuevo usuario
  async createUser(createUserDto: CreateUserDto): Promise<User> {

    // Verificar si el email ya está registrado
    const existeUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existeUser) {
      throw new HttpException('El email ya está registrado', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  // Actualizar un usuario existente
  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id_user: updateUserDto.id_user });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Evitar duplicar email de otro usuario
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingEmail) {
        throw new HttpException('El email ya está registrado por otro usuario', HttpStatus.BAD_REQUEST);
      }
    }

    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
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
