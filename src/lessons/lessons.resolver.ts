import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonType } from './lesson.type';
import { LessonsService } from './lessons.service';

@Resolver((of) => LessonType)
export class LessonsResolver {
  constructor(private service: LessonsService) {}

  @Query((returns) => [LessonType])
  lessons(): Promise<Lesson[]> {
    return this.service.getAll();
  }

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string): Promise<Lesson> {
    return this.service.getById(id);
  }

  @Mutation((returns) => LessonType)
  create(@Args('create') body: CreateLessonInput): Promise<Lesson> {
    return this.service.createLesson(body);
  }
}
