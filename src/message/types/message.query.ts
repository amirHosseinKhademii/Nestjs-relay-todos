import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class MessagesQuery {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  chatId: string;
}
