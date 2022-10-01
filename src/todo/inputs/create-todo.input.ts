import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
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
}
