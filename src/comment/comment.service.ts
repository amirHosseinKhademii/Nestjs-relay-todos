import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardService } from 'src/card';
import { ConnectionArgs, nextId } from 'src/relay';
import { findAll } from 'src/services';
import { Repository } from 'typeorm';
import { Comment, CommentConnection } from './types';
import { CreateCommentInput, LikeCommentInput } from './types/comment.input';
import { AddCommentPayload } from './types/comment.response';
import { v4 as uuid } from 'uuid';
import { toGlobalId } from 'graphql-relay';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private repo: Repository<Comment>,
    @Inject(forwardRef(() => CardService)) private cardService: CardService,
  ) {}

  async findAllComments(
    args: ConnectionArgs,
    cardId: string,
  ): Promise<CommentConnection> {
    return await findAll(args, this.repo, { cardId });
  }

  async findCommentById(id: string) {
    return await this.repo.findOneBy({ id });
  }

  async findCommentsByIds(
    args: ConnectionArgs,
    commentIds: string[],
  ): Promise<CommentConnection> {
    return await findAll(args, this.repo, {
      id: { $in: commentIds ?? [] } as any,
    });
  }

  async addComment(input: CreateCommentInput): Promise<AddCommentPayload> {
    const guid = uuid();
    const id = toGlobalId('Comment', guid);
    const comment = await this.repo.create({ ...input, likes: [], id });
    const result = await this.repo.save(comment);
    await this.cardService.updateCommentInCardById({
      commentId: id,
      cardId: input.cardId,
    });
    return {
      addCommentEdge: {
        node: result,
        cursor: nextId(id).toString(),
      },
    } as any;
  }

  async deleteCommentById(id: string) {
    return await this.repo.delete(id);
  }

  async likeComment(args: LikeCommentInput, userId: string) {
    const { id } = args;
    const updated_at = new Date();
    const comment = await this.repo.findOneByOrFail({ id });
    const isLiked = comment.likes.includes(userId);
    const likes = !isLiked
      ? [...comment.likes, userId]
      : comment.likes.filter((like) => like !== userId);
    const updatedComment: Comment = { ...comment, updated_at, likes };
    const result = await this.repo.save(updatedComment);
    return { comment: result };
  }
}
