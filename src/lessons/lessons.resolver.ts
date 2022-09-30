import { Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonsResolver {
  @Query((returns) => [LessonType])
  lessons() {
    return [];
  }
}
