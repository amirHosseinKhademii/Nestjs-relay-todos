import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  create(
    @Args('name') name: string,
    @Args('startDay') startDay: string,
    @Args('endDay') endDay: string,
  ): Promise<LessonType> {
    return this.service.createLesson({ name, startDay, endDay });
  }
}
