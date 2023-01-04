// import { Resolver } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { fromGlobalId } from 'graphql-relay';

import { CardService } from 'src/card/card.service';
import { NodeInterface } from './app.resolver';
import { NodeFieldResolver } from './node-field.resolver';

@Resolver(NodeInterface)
export class NodeResolver extends NodeFieldResolver {
  constructor(private cardService: CardService) {
    super();
  }
  resolveNode(gid: string) {
    const { type } = fromGlobalId(gid);
    switch (type) {
      case 'Card':
        return this.cardService.findCardById(gid);
      default:
        return null;
    }
  }
}
