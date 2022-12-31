import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@ArgsType()
export class UpdateTodoArgs {
  @IsNotEmpty()
  @IsString()
  @Field()
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @Field({ nullable: true })
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @Field({ nullable: true })
  description: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isCompleted: boolean;
}
