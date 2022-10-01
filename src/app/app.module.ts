import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LessonsModule } from 'src/lessons/lessons.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '../lessons/lesson.entity';
import { StudentsModule } from 'src/students/students.module';
import { Student } from 'src/students/student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Lesson, Student],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    LessonsModule,
    StudentsModule,
  ],
})
export class AppModule {}
