import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectionFromArraySlice } from 'graphql-relay';
import { ConnectionArgs, getPagingParameters } from 'src/relay';
import { Repository } from 'typeorm';
import { Comment, CommentConnection } from './types';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  async findAllComments(args: ConnectionArgs): Promise<CommentConnection> {
    const { limit, offset } = getPagingParameters(args);
    const [results, count] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
    });

    return connectionFromArraySlice(results, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }

  async findCommentsByIds(
    args: ConnectionArgs,
    commentIds: string[],
  ): Promise<CommentConnection> {
    const { limit, offset } = getPagingParameters(args);
    const [results, count] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
      where: {
        id: { $in: commentIds ?? [] } as any,
      },
    });
    return connectionFromArraySlice(results, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }
}
