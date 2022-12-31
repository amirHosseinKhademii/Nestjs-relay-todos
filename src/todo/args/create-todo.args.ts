import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@ArgsType()
export class CreateTodoArgs {
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
