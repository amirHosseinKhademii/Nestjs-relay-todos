import { ObjectType } from '@nestjs/graphql';
import { CreateConnectionType } from 'src/relay';
import { User } from './user.type';

@ObjectType()
export class UsersConnection extends CreateConnectionType<User>(User) {}
