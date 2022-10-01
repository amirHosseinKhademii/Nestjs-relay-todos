import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from 'src/students/students.module';
import { Lesson } from './lesson.entity';
import { LessonsResolver } from './lessons.resolver';
import { LessonsService } from './lessons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), StudentsModule],
  providers: [LessonsResolver, LessonsService],
})
export class LessonsModule {}
