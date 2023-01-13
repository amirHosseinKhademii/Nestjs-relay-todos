import { Field, ObjectType } from '@nestjs/graphql';
import { ConnectionCursor, Edge } from 'graphql-relay';
import { Comment } from './comment.types';

@ObjectType(`CommentResponseEdge`, { isAbstract: true })
export class CommentResponseEdge implements Edge<Comment> {
  @Field({ nullable: true })
  public cursor: ConnectionCursor;

  @Field(() => Comment, { nullable: true })
  public node!: Comment;
}

@ObjectType()
export class AddCommentPayload {
  @Field(() => CommentResponseEdge)
  addCommentEdge: CommentResponseEdge;

  @Field(() => String)
  clientMutationId: string;
}
