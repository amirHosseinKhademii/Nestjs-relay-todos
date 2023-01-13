import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver, ID } from '@nestjs/graphql';
import { ConnectionArgs, InputArg, RelayMutation } from 'src/relay';
import { AuthGraphGuard } from 'src/user';
import { CommentService } from './comment.service';
import { CommentConnection } from './types';
import { CreateCommentInput } from './types/comment.input';
import { AddCommentPayload } from './types/comment.response';

@Resolver()
@UseGuards(new AuthGraphGuard())
export class CommentResolver {
  constructor(private service: CommentService) {}

  @Query(() => CommentConnection, { name: 'comments' })
  comments(
    @Args() args: ConnectionArgs,
    @Args('cardId', { type: () => ID }) cardId: string,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<CommentConnection> {
    return this.service.findAllComments(args, cardId);
  }

  @RelayMutation(() => AddCommentPayload)
  async addComment(
    @InputArg(() => CreateCommentInput) input: CreateCommentInput,
  ): Promise<AddCommentPayload> {
    const comment = await this.service.addComment(input);
    // pubSub.publish('cardAdded', {
    //   cardAdded: await card,
    // });
    return comment;
  }
}
