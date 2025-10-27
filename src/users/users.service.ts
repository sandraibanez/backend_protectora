import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto, UpdateUsers } from './users.dto';
import { User } from './users.entity';
import { Repository } from 'typeorm';;

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
      return this.userRepository.find();
  }
  async getUser(id: number): Promise<User | string | null> {
      const user = await this.userRepository.findOneBy({ id });

      if (user != null) {
          return user;
      } else {
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
  }

  async createUser(createUsersDto: CreateUsersDto): Promise<User> {
      const user = await this.userRepository.create(createUsersDto);
      return this.userRepository.save(user);
  }
  
  async updateUser(updateUser: UpdateUsers): Promise<User> {
      const user = await this.userRepository.findOne({
          where: { id: updateUser.id },
      });

      if (!user) {
          throw new Error('User no encontrado');
      }

      this.userRepository.merge(user, updateUser);
      return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
      await this.userRepository.delete(id);
  }
}
