import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CommentConnection } from 'src/comment';
import { NodeInterface, CreateConnectionType, NodeType } from 'src/relay';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Field({ nullable: true, defaultValue: false })
  @Column({ default: false })
  isCompleted: boolean;

  @Column({ default: [] })
  @Field(() => CommentConnection)
  comments: string[];

  @Field({ nullable: true })
  @CreateDateColumn({ update: false })
  created_at: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updated_at: Date;
}

@ObjectType()
export class CardConnection extends CreateConnectionType<Card>(Card) {}
