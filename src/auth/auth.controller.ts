import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signup')
  signup(@Body() body: CreateUserDto): Promise<void> {
    return this.service.createUser(body);
  }

  @Post('signin')
  signin(@Body() body: CreateUserDto): Promise<string> {
    return this.service.signin(body);
  }
}
