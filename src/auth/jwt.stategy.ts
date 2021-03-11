import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Jwt } from '../constants';
import { UsersService } from 'src/users/users.service';
import { classToPlain } from 'class-transformer';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Jwt.secret,
    });
  }

  async validate(payload: { username: string, id: string }) {
    const entity = await this.usersService.findOne(payload.username);
    if (entity) {
      return classToPlain(entity);
    }
    throw new UnauthorizedException();
  }
}
