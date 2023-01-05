import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@ArgsType()
export class TodoCreateArgs {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @Field()
  title: string;

  @IsOptional()
  @Field({ nullable: true, defaultValue: '' })
  description?: string;
}
