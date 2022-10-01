import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  lastName: string;
}
