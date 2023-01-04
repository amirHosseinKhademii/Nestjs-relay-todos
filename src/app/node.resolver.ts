// import { Resolver } from '@nestjs/graphql';
// import {
//   NodeInterface,
//   NodeFieldResolver,
//   ResolvedGlobalId,
// } from 'nestjs-relay';
// import { CardService } from 'src/card/card.service';

// @Resolver(NodeInterface)
// export class NodeResolver extends NodeFieldResolver {
//   constructor(private cardService: CardService) {
//     super();
//   }
//   resolveNode(resolvedGlobalId: ResolvedGlobalId) {
//     switch (resolvedGlobalId.type) {
//       case 'Card':
//         return this.cardService.findCardById(resolvedGlobalId.toString());
//       default:
//         return null;
//     }
//   }
// }
