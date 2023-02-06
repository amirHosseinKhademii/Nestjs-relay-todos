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
  @Field(() => UserResponseEdge)
  followUserEdge: UserResponseEdge;

  @Field(() => String)
  clientMutationId: string;
}
