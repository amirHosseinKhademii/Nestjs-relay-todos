import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver, ID } from '@nestjs/graphql';
import { ConnectionArgs, InputArg, RelayMutation } from 'src/relay';
import { AuthGraphGuard, GetUser, User } from 'src/user';
import { CommentService } from './comment.service';
import { CommentConnection, Comment } from './types';
import {
  CreateCommentInput,
  DeleteCommentInput,
  LikeCommentInput,
} from './types/comment.input';
import {
  AddCommentPayload,
  DeleteCommentPayload,
  LikeCommentPayload,
} from './types/comment.response';

@Resolver(() => Comment)
@UseGuards(new AuthGraphGuard())
export class CommentResolver {
  constructor(
    private service: CommentService, // private userService: UserService,
  ) {}

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

  @RelayMutation(() => DeleteCommentPayload)
  async deleteComment(@InputArg(() => DeleteCommentInput) id: string) {
    await this.service.deleteCommentById(id);
    return id;
  }

  @RelayMutation(() => LikeCommentPayload)
  async likeComment(
    @GetUser() user: User,
    @InputArg(() => LikeCommentInput) input: LikeCommentInput,
  ) {
    return await this.service.likeComment(input, user.id);
  }

  // @ResolveField(() => [User])
  // likes(@Parent() comment: Comment) {
  //   return this.userService.findUsersByIds(comment.likes);
  // }
}
