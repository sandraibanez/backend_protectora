import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService { constructor( private jwtService: JwtService, @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    async signIn( email: string, pass: string ): Promise<{ access_token: string }> {
        const user = await this.getUserlogin(email);

        const passwordMatch = await bcrypt.compare(pass, user.contrasenya);

        if (!passwordMatch) {
            throw new UnauthorizedException();
        }
        const payload = {
          id: user.id_user,
          rol: user.rol,
          id_protectora: user.protectora.id_protectora ?? null
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

     // Obtener un usuario por email para el login 
      async getUserlogin(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
          where: { email },
        });
    
        if (!user) {
          throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        return user;
      }
}
