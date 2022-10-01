import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonInput } from './lesson.input';
import { LessonType } from './lesson.type';
import { LessonsService } from './lessons.service';

@Resolver((of) => LessonType)
export class LessonsResolver {
  constructor(private service: LessonsService) {}

  @Query((returns) => [LessonType])
  lessons(): Promise<LessonType[]> {
    return this.service.getAll();
  }

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string): Promise<LessonType> {
    return this.service.getById(id);
  }

  @Mutation((returns) => LessonType)
  create(@Args('create') body: CreateLessonInput): Promise<LessonType> {
    return this.service.createLesson(body);
  }
}
