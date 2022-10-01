import { Todo } from 'src/todo/todo.entity';
import {
  Column,
  Entity,
  ObjectIdColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo)
  todos: Todo[];
}
