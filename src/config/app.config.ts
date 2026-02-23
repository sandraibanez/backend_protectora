import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig {
  /**
   * ID de la protectora a la que pertenece esta instancia de la aplicación.
   * Cada app está asociada a una única protectora (multi-tenant).
   */
  get protectoraId(): number {
    const id = parseInt(process.env.PROTECTORA_ID || '1');
    if (isNaN(id) || id <= 0) {
      throw new Error('PROTECTORA_ID debe ser un número válido en el archivo .env');
    }
    return id;
  }

  /**
   * Verifica si un usuario pertenece a la protectora de esta app.
   * @param userProtectoraId ID de la protectora del usuario
   * @returns true si pertenece a esta protectora
   */
  belongsToAppProtectora(userProtectoraId: number | null | undefined): boolean {
    return userProtectoraId === this.protectoraId;
  }
}
