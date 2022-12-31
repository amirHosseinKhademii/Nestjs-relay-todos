import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@ArgsType()
export class SigninUserArgs {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  userName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
