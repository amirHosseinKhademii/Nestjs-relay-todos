import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/user/user.type';

@ObjectType('Todo')
export class TodoType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field((type) => UserType, { nullable: true })
  user: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}
