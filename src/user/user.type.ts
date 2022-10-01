import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StudentType } from 'src/students/student.type';

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
}
