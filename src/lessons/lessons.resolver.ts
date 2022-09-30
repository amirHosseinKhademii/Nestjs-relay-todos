import { Body } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonType } from './lesson.type';
import { LessonsService } from './lessons.service';

@Resolver((of) => LessonType)
export class LessonsResolver {
  constructor(private service: LessonsService) {}

  @Query((returns) => [LessonType])
  lessons() {
    return this.service.getAll();
  }

  @Query((returns) => LessonType)
  lesson() {
    return {};
  }

  @Mutation((returns) => LessonType)
  create(
    @Args('name') name: string,
    @Args('startDay') startDay: string,
    @Args('endDay') endDay: string,
  ) {
    return this.service.createLesson({ name, startDay, endDay });
  }
}
