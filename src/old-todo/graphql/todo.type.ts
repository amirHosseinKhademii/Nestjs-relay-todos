import { Field, ID, ObjectType } from '@nestjs/graphql';

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

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}
