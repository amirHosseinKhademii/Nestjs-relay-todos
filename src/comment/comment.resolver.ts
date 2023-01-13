import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ConnectionArgs } from 'src/relay';
import { AuthGraphGuard } from 'src/user';
import { CommentService } from './comment.service';
import { CommentConnection } from './types';

@Resolver()
@UseGuards(new AuthGraphGuard())
export class CommentResolver {
  constructor(private service: CommentService) {}

  @Query(() => CommentConnection, { name: 'comments' })
  cards(
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<CommentConnection> {
    return this.service.findAllComments(args);
  }
}
