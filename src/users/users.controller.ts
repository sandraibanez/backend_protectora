import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
     constructor(private readonly UsersService: UsersService) { }
    
      @Get()
      getHello(): string {
        return this.UsersService.getHelloUser();
      }
}
