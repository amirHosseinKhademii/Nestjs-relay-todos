import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser({ username, password }: CreateUserDto): Promise<void> {
    const user = await this.repo.create({ username, password });
    await this.repo.save(user);
  }
}
