import { Field, ID, ObjectType } from '@nestjs/graphql';
//import { TodoGQL } from 'src/todo/graphql/todo.type';

@ObjectType('User')
export class UserGQL {
  @Field((type) => ID)
  id: string;

  @Field()
  userName: string;

  @Field()
  fullName: string;

  @Field()
  password: string;

  // @Field((type) => [TodoGQL], { nullable: true })
  // todos: string[];
}
