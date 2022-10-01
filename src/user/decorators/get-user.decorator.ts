import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../user.entity';

export const GetUser = createParamDecorator(
  (_, context: ExecutionContext): User => {
    const req = GqlExecutionContext.create(context).getContext().req;
    return req.user;
  },
);
