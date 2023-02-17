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
import {
  CreateUserInput,
  FollowInput,
  SigninUserInput,
} from './types/user.input';
import { toGlobalId } from 'graphql-relay';
import { ConnectionArgs } from 'src/relay';
import { findAll } from 'src/services';
import { AuthPayload, UsersConnection } from './types/user.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwt: JwtService,
  ) {}

  async findAllUsers(args: ConnectionArgs): Promise<UsersConnection> {
    return await findAll(args, this.repo);
  }

  async finduserById(id: string) {
    return await this.repo.findOneBy({ id });
  }

  async findUsersByIds(
    args: ConnectionArgs,
    ids: string[],
  ): Promise<UsersConnection> {
    return await findAll(args, this.repo, {
      id: { $in: ids ?? [] } as any,
    });
  }

  async signupUser(body: CreateUserInput) {
    const hashed = await hasher(body.password);
    const user = await this.repo.create({
      ...body,
      password: hashed,
      id: toGlobalId('User', uuid()),
      followers: [],
      followings: [],
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

  async signinUser({
    userName,
    password,
  }: SigninUserInput): Promise<AuthPayload> {
    const user = await this.repo.findOneBy({ userName });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.jwt.sign({ userName });
      return {
        token,
        user,
      };
    } else throw new UnauthorizedException('Check your credentials.');
  }

  async followOrUnfollowUser({ id }: FollowInput, followerId: string) {
    const updated_at = new Date();

    const followerUser = await this.repo.findOneByOrFail({ id: followerId });

    const user = await this.repo.findOneByOrFail({ id });

    const isFollowed = user.followers.includes(followerId);

    const isFollowing = followerUser.followings.includes(id);

    const followers = !isFollowed
      ? [...user.followers, followerId]
      : user.followers.filter((follow) => follow !== followerId);

    const followings = !isFollowing
      ? [...followerUser.followings, id]
      : followerUser.followings.filter((follow) => follow !== id);

    const updatedUser: User = { ...user, updated_at, followers };
    const updatedFollower: User = { ...followerUser, updated_at, followings };
    const resultUser = await this.repo.save(updatedUser);
    const resultFollower = await this.repo.save(updatedFollower);

    return {
      user: resultUser,
    };
  }
}
