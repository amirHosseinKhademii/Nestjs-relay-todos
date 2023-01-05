import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NodeInterface } from 'src/relay/app.resolver';
import { NodeType } from 'src/relay/node-type.decorator';
import { relayTypes } from 'src/relay/relay.types';
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
export class CardConnection extends relayTypes<Card>(Card) {}
