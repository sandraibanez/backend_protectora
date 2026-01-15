// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport'; 
// import { ExtractJwt, Strategy } from 'passport-jwt'; 
// import { jwtConstants } from './constants';


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: jwtConstants.secret,
//     });
//   }

//   async validate(payload: any) {
//     // Lo que devuelve aquí estará disponible en req.user
//     return {
//       id_user: payload.id_user,
//       nombre: payload.nombre,
//       rol: payload.rol,
//     };
//   }
// }
