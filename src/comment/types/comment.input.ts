import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID!)
  cardId: string;

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
export class DeleteCommentInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => ID)
  id: string;
}

@InputType()
export class LikeCommentInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => ID)
  id: string;
}
