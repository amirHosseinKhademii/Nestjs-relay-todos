import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './inputs/create-user.input';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { hasher } from './utils/hasher';
import { SigninUserInput } from './inputs/signin-user.input';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwt: JwtService,
  ) {}

  async getUsers() {
    return await this.repo.find();
  }

  async getUser(id: string) {
    return await this.repo.findOneBy({ id });
  }

  async createUser(body: CreateUserInput) {
    const hashed = await hasher(body.password);
    const user = await this.repo.create({
      ...body,
      password: hashed,
      id: uuid(),
      todos: [],
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

  async signin({ userName, password }: SigninUserInput): Promise<string> {
    const user = await this.repo.findOneBy({ userName });
    if (user && (await bcrypt.compare(password, user.password)))
      return await this.jwt.sign({ userName });
    else throw new UnauthorizedException('Check your credentials.');
  }

  @UseGuards(AuthGuard())
  async addTodo(userId: string, todoId: string) {
    const user = await this.repo.findOneBy({ id: userId });
    user.todos = [...user.todos, todoId];
    return await this.repo.save(user);
  }
}
