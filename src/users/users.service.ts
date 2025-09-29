import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
     getHelloUser(): string {
    return 'Hello 2DAM Booking Users!';
  }
}
