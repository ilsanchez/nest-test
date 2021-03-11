import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const Hasher = require('password-hash')

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name)

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  
  async register(payload: RegisterDto) {
    const coincidence = await this.usersService.find(payload);
    if (coincidence.length !== 0) {
      throw new InternalServerErrorException(
        'An user with this username or email already exists',
      );
    }
    const hash = Hasher.generate(payload.password) as string;
    await this.usersService.create({
      ...payload,
      password: hash,
    });
  }

  async login(user: LoginDto) {
    const entity = await this.usersService.findOne(user.username);
    if (entity && Hasher.verify(user.password, entity.password)) {
      return {
        access_token: this.jwtService.sign({
          username: entity.username,
          id: entity.username,
        }),
      };
    } else {
      throw new UnauthorizedException('Incorrect username or password');
    }
  }
}
