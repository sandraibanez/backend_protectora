
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { AppConfig } from 'src/config/app.config';
import { RolUsuario } from 'src/user/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private appConfig: AppConfig,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );

      // Validar que el usuario pertenece a la protectora de esta app
      // Admin tiene acceso total, otros roles deben pertenecer a la protectora
      if (payload.rol !== RolUsuario.ADMIN) {
        const userProtectoraId = payload.protectora?.id_protectora;
        
        if (!this.appConfig.belongsToAppProtectora(userProtectoraId)) {
          throw new ForbiddenException(
            'No tienes acceso a esta protectora. Por favor usa la app correspondiente a tu protectora.'
          );
        }
      }

      request['user'] = payload;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
