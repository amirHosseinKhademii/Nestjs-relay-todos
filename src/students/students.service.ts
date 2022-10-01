import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';
import { v4 as uuid } from 'uuid';
@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private repo: Repository<Student>) {}

  async getAll() {
    return await this.repo.find();
  }

  async create(body: CreateStudentInput) {
    const student = await this.repo.create({ ...body, id: uuid() });
    return await this.repo.save(student);
  }
}
