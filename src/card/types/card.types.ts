import { Field, ID, ObjectType, InterfaceType } from '@nestjs/graphql';

import { NodeInterface } from 'src/app/app.resolver';
import { NodeType } from 'src/app/node-type.decorator';
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
}

@ObjectType()
export class CardResponse extends relayTypes<Card>(Card) {}
