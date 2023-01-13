import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionArgs } from 'src/relay';
import { findAll } from 'src/services';
import { Repository } from 'typeorm';
import { Comment, CommentConnection } from './types';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  async findAllComments(args: ConnectionArgs): Promise<CommentConnection> {
    return await findAll(args, this.repo);
  }

  async findCommentsByIds(
    args: ConnectionArgs,
    commentIds: string[],
  ): Promise<CommentConnection> {
    return await findAll(args, this.repo, {
      id: { $in: commentIds ?? [] } as any,
    });
  }
}
