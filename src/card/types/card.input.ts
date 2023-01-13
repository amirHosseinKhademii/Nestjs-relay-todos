import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

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

@InputType()
export class UpdateCardInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => ID)
  id: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @Field({ nullable: true })
  title: string;

  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isCompleted: boolean;
}

@InputType()
export class DeleteCardInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => ID)
  id: string;
}
