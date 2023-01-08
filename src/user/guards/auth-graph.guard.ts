import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGraphGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (context.getArgByIndex(2).connectionParams?.websocket) {
      return {
        headers: { ...context.getArgByIndex(2)?.connectionParams?.headers },
      };
    }
    if (context.getArgByIndex(2)?.websocket) {
      return {
        headers: { ...context.getArgByIndex(2)?.headers },
      };
    }

    return ctx.req;
  }
}
