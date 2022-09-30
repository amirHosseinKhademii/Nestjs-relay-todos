import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonsService {
  constructor(@InjectRepository(Lesson) private repo: Repository<Lesson>) {}

  async getAll() {
    return await this.repo.find();
  }

  async createLesson(body: CreateLessonDto) {
    const lesson = await this.repo.create({ ...body, id: uuid() });
    return await this.repo.save(lesson);
  }
}
