import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserGQL } from 'src/user/graphql/user.type';

@ObjectType('Todo')
export class TodoGQL {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  isCompleted: boolean;

  @Field((type) => UserGQL, { nullable: true })
  user: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}
