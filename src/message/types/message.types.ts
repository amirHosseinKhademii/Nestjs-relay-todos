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

@NodeType('Message')
@Entity()
export class Message implements NodeInterface {
  @ObjectIdColumn({ update: false })
  _id: string;

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID!)
  id: string;

  @Field()
  @Column()
  body: string;

  @Field({ nullable: true })
  @CreateDateColumn({ update: false })
  created_at: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @Field(() => String)
  user: string;

  @Column()
  @Field(() => User)
  receiver: string;

  @Column()
  @Field(() => String)
  chatId: string;
}

@ObjectType()
export class MessageConnection extends CreateConnectionType<Message>(Message) {}
