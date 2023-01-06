import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateCardInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID!)
  todoId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @Field()
  title: string;

  @IsOptional()
  @Field({ nullable: true, defaultValue: '' })
  description?: string;
}
