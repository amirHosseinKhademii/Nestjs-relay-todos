import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    super({
      secretOrKey: 'top-51',
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    });
  }

  async validate({ userName }: { userName: string }) {
    const user = await this.repo.findOneBy({ userName });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
