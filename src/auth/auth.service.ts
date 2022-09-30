import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser({ username, password }: CreateUserDto): Promise<void> {
    const user = await this.repo.create({ username, password });
    try {
      await this.repo.save(user);
    } catch (error) {
      if (error.code == 23505)
        throw new ConflictException('User already exist.');
      else throw new InternalServerErrorException('Something went wrong.');
    }
  }
}
