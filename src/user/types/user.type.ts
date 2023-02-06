import { Field, ID } from '@nestjs/graphql';
import { NodeInterface, NodeType } from 'src/relay';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@NodeType('User')
@Entity()
export class User implements NodeInterface {
  @ObjectIdColumn({ update: false })
  _id: string;

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID!)
  id: string;

  @Field()
  @Column({ unique: true })
  userName: string;

  @Field()
  @Column()
  fullName: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @CreateDateColumn({ update: false })
  created_at: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: [] })
  @Field(() => [ID], { defaultValue: [] })
  followers: string[];

  @Column({ default: [] })
  @Field(() => [ID], { defaultValue: [] })
  followings: string[];
}
