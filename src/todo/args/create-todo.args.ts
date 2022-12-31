import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@ArgsType()
export class CreateTodoArgs {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @Field()
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @Field({ nullable: true })
  description: string;
}
