import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TodoType } from 'src/todo/todo.type';

@ObjectType('User')
export class UserType {
  @Field((type) => ID)
  id: string;

  @Field()
  userName: string;

  @Field()
  fullName: string;

  @Field()
  password: string;

  @Field((type) => [TodoType], { nullable: true })
  todos: string[];
}
