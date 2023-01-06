import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NodeInterface, CreateConnectionType, NodeType } from 'src/relay';
import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@NodeType('Card')
@Entity()
export class Card implements NodeInterface {
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
}

@ObjectType()
export class CardConnection extends CreateConnectionType<Card>(Card) {}
