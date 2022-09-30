import { Module } from '@nestjs/common';
import { LessonsResolver } from './lessons.resolver';

@Module({
  providers: [LessonsResolver],
})
export class LessonsModule {}
