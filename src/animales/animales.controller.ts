import { Controller, Get } from '@nestjs/common';
import { AnimalesService } from './animales.service';
import { Animales } from './animales.entity';

@Controller('animales')
export class AnimalesController {
  constructor(private readonly AnimalesService: AnimalesService) {}

  // @Get()
  // getHello(): string {
  //   return this.usersService.getHello();
  // }
  // @Get()
  // findAll() {
  //   return this.AnimalesService.findAll();
  // }
  
}
