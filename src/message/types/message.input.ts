import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @Field(() => String)
  body: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  receiver: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  chatId: string;
}
