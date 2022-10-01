import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StudentType } from 'src/students/student.type';

@ObjectType('Lesson')
export class LessonType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDay: string;

  @Field()
  endDay: string;

  @Field((type) => [StudentType])
  students: string[];
}
