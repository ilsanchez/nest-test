import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { SkipAuth } from 'src/constants';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

  constructor(private authService: AuthService) {}

  @SkipAuth()
  @Post('login')
  login(@Body() req: LoginDto) {
    return this.authService.login(req);
  }

  @SkipAuth()
  @Post('register')
  register(@Body() req: RegisterDto) {
    return this.authService.register(req);
  }
}
