import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwt: JwtService,
  ) {}

  async createUser({ username, password }: CreateUserDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    const user = await this.repo.create({ username, password: hashed });
    try {
      await this.repo.save(user);
    } catch (error) {
      if (error.code == 23505)
        throw new ConflictException('User already exist.');
      else throw new InternalServerErrorException('Something went wrong.');
    }
  }

  async signin({ username, password }: CreateUserDto): Promise<string> {
    const user = await this.repo.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password)))
      return await this.jwt.sign({ username });
    else throw new UnauthorizedException('Check your credentials.');
  }
}
