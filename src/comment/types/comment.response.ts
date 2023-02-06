import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ConnectionCursor, Edge } from 'graphql-relay';
import { NodeInterface } from 'src/relay';
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

@ObjectType()
export class DeleteCommentPayload {
  @Field(() => ID)
  id: NodeInterface;

  @Field(() => String)
  clientMutationId: string;
}

@ObjectType()
export class LikeCommentPayload {
  @Field(() => Comment)
  comment: Comment;

  @Field(() => String)
  clientMutationId: string;
}
