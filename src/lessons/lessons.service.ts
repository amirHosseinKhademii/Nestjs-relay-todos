import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonsService {
  constructor(@InjectRepository(Lesson) private repo: Repository<Lesson>) {}

  async getAll(): Promise<Lesson[]> {
    return await this.repo.find();
  }

  async getById(id: string): Promise<Lesson> {
    return await this.repo.findOneBy({ id });
  }

  async createLesson(body: CreateLessonInput): Promise<Lesson> {
    const lesson = await this.repo.create({ ...body, id: uuid() });
    return await this.repo.save(lesson);
  }
}
