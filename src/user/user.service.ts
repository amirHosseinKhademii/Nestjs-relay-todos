import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './inputs/create-user.input';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async getUsers() {
    return await this.repo.find();
  }

  async createUser(body: CreateUserInput) {
    const user = this.repo.create({ ...body, id: uuid() });
    await this.repo.save(user);
    return 'success';
  }
}
