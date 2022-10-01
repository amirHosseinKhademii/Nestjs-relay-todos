import { Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentsReolver {
  @Query((returens) => [StudentType])
  students() {
    return [];
  }
}
