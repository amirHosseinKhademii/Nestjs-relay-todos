import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @Field()
  @IsDateString()
  startDay: string;

  @Field()
  @IsDateString()
  endDay: string;
}
