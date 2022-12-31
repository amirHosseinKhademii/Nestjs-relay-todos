import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';

@InputType()
export class GetTodosQuery {
  @IsOptional()
  @IsString()
  @Field()
  from: string;

  @IsOptional()
  @IsString()
  @Field()
  until: string;
}
