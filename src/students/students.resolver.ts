import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './student.input';
import { StudentType } from './student.type';
import { StudentsService } from './students.service';

@Resolver((of) => StudentType)
export class StudentsReolver {
  constructor(private service: StudentsService) {}

  @Query((returens) => [StudentType])
  students() {
    return this.service.getAll();
  }

  @Mutation((returns) => StudentType)
  createStudent(@Args('createStudent') body: CreateStudentInput) {
    return this.service.create(body);
  }
}
