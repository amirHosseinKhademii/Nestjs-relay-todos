import { Field, ObjectType } from '@nestjs/graphql';
import { ConnectionCursor, Edge } from 'graphql-relay';
import { CreateConnectionType } from 'src/relay';
import { User } from './user.type';

@ObjectType()
export class UsersConnection extends CreateConnectionType<User>(User) {}

@ObjectType(`UserResponseEdge`, { isAbstract: true })
export class UserResponseEdge implements Edge<User> {
  @Field({ nullable: true })
  public cursor: ConnectionCursor;

  @Field(() => User, { nullable: true })
  public node!: User;
}

@ObjectType()
export class FollowPayload {
  @Field(() => User)
  user: User;

  @Field(() => String)
  clientMutationId: string;
}

@ObjectType()
export class AuthPayload {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;
}
