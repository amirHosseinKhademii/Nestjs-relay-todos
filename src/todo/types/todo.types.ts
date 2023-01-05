import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NodeInterface } from 'src/relay/app.resolver';
import { CardConnection } from 'src/card/types/card.types';
import { relayTypes } from 'src/relay/relay.types';
import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NodeType } from 'src/relay/node-type.decorator';

@NodeType('Todo')
@Entity()
export class Todo implements NodeInterface {
  @ObjectIdColumn({ update: false })
  _id: string;

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID!)
  id: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true, defaultValue: '' })
  @Column({ nullable: true, default: '' })
  description?: string;

  @Field(() => CardConnection)
  cards: CardConnection;
}

@ObjectType()
export class TodoConnection extends relayTypes<Todo>(Todo) {}
