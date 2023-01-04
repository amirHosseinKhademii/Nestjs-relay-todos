import { Field, ID, ObjectType, InterfaceType } from '@nestjs/graphql';
import { ResolvedGlobalId } from 'nestjs-relay';
import { relayTypes } from 'src/relay/relay.types';
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

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID!)
  id: string;

  @Field()
  @Column()
  title: string;
}

@ObjectType()
export class CardResponse extends relayTypes<Card>(Card) {}
