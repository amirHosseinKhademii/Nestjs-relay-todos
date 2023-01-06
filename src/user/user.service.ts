import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './types';
import { v4 as uuid } from 'uuid';
import { hasher } from './utils';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput, SigninUserInput } from './types/user.input';
import { toGlobalId } from 'graphql-relay';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwt: JwtService,
  ) {}

  async findAllUsers() {
    return await this.repo.find();
  }

  async finduserById(id: string) {
    return await this.repo.findOneBy({ id });
  }

  async signupUser(body: CreateUserInput) {
    const hashed = await hasher(body.password);
    const user = await this.repo.create({
      ...body,
      password: hashed,
      id: toGlobalId('User', uuid()),
    });
    try {
      await this.repo.save(user);
      return await this.jwt.sign({ userName: body.userName });
    } catch (error) {
      if (error.code == 23505)
        throw new ConflictException('User already exist.');
      else throw new InternalServerErrorException('Something went wrong.');
    }
  }

  async signinUser({ userName, password }: SigninUserInput): Promise<string> {
    const user = await this.repo.findOneBy({ userName });
    if (user && (await bcrypt.compare(password, user.password)))
      return await this.jwt.sign({ userName });
    else throw new UnauthorizedException('Check your credentials.');
  }
}
