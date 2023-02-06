import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

@ArgsType()
export class SigninUserInput {
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

@ArgsType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  userName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  fullName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

@ArgsType()
export class GetUsersByIdsInput {
  @Field(() => [ID])
  @IsArray()
  ids: string[];
}
