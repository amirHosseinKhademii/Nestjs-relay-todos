// import { Resolver } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { fromGlobalId } from 'graphql-relay';
import { NodeFieldResolver, NodeInterface } from 'src/relay';
import { TodoService } from 'src/todo';
import { CardService } from 'src/card';

@Resolver(NodeInterface)
export class NodeResolver extends NodeFieldResolver {
  constructor(
    private cardService: CardService,
    private todoService: TodoService,
  ) {
    super();
  }
  resolveNode(gid: string) {
    const { type } = fromGlobalId(gid);
    switch (type) {
      case 'Card':
        return this.cardService.findCardById(gid);
      case 'Todo':
        return this.todoService.findTodoById(gid);
      default:
        return null;
    }
  }
}
