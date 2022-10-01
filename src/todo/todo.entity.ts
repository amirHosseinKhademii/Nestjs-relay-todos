import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @ObjectIdColumn()
  _id: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @ManyToOne(() => User, (user) => user.id)
  user: string;
}
