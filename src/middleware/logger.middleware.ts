import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const method = req.method;
    const url = req.url;

    // Colores ANSI
    const green = '\x1b[32m';
    const yellow = '\x1b[33m';
    const cyan = '\x1b[36m';
    const reset = '\x1b[0m';

    // Cuando la respuesta termina calcula el tiempo
    res.on('finish', () => {
      const duration = Date.now() - start;
      const status = res.statusCode;

      // Si el usuario está autenticado lo muestra
      const userInfo = req['user']
        ? `${cyan}user:${req['user'] as { id_user: number }}${reset}`
        : `${yellow}anon${reset}`;

      console.log(
        `${green}[${method}]${reset} ${url} → status:${status} | ${userInfo} | ${duration}ms`
      );
    });

    next();
  }
}
