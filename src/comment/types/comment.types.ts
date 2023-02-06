import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NodeInterface, CreateConnectionType, NodeType } from 'src/relay';
import { User } from 'src/user';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@NodeType('Comment')
@Entity()
export class Comment implements NodeInterface {
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

  @Field(() => ID!)
  @Column()
  cardId: string;

  @Field({ nullable: true })
  @CreateDateColumn({ update: false })
  created_at: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => [ID], { defaultValue: [] })
  @Column({ default: [] })
  likes: string[];
}

@ObjectType()
export class CommentConnection extends CreateConnectionType<Comment>(Comment) {}
