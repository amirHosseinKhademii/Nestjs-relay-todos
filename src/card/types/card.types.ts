import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType('Card')
@Entity()
export class Card {
  @ObjectIdColumn({ update: false })
  _id: string;

  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;
}
