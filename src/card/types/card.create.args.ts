import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@ArgsType()
export class CardCreateArgs {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @Field()
  title: string;
}
