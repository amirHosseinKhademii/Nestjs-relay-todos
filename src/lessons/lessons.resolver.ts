import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StudentsService } from 'src/students/students.service';
import { AssignStudentToLesson } from './assign-studebt.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonType } from './lesson.type';
import { LessonsService } from './lessons.service';

@Resolver((of) => LessonType)
export class LessonsResolver {
  constructor(
    private service: LessonsService,
    private studentService: StudentsService,
  ) {}

  @Query((returns) => [LessonType])
  lessons(): Promise<Lesson[]> {
    return this.service.getAll();
  }

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string): Promise<Lesson> {
    return this.service.getById(id);
  }

  @Mutation((returns) => LessonType)
  createLesson(@Args('createLesson') body: CreateLessonInput): Promise<Lesson> {
    return this.service.createLesson(body);
  }

  @Mutation((returns) => LessonType)
  assignStudentTolesson(@Args('assignToLesson') body: AssignStudentToLesson) {
    return this.service.signStudentsToLesson(body);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
