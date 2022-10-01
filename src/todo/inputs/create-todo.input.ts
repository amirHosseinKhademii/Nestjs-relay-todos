import { Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateTodoInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @Field()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @IsUUID('4', { each: true })
  @Field((type) => ID)
  user: string;
}
