import {
  Args,
  Resolver,
  Query,
  Field,
  InterfaceType,
  ID,
} from '@nestjs/graphql';

import { CardService } from 'src/card/card.service';

interface RelayResolvedGlobalId {
  type: string;
  id: string;
}

@InterfaceType('Node')
export class NodeInterface {
  @Field(() => ID, {
    nullable: false,
  })
  id!: string;
}

export const typeNodeInterface = () => NodeInterface;

export const typeNodeInterfaces = () => [NodeInterface];

export const returnsNodeInterface = () => NodeInterface;

export const returnsNodeInterfaces = () => [NodeInterface];

export type ResolvedNode =
  | Promise<NodeInterface>
  | NodeInterface
  | Promise<null>
  | null
  | Promise<undefined>
  | undefined;

@Resolver(() => NodeInterface)
export class AppResolver {
  constructor(private service: CardService) {}

  @Query()
  node(
    @Args('id', {
      name: 'id',
      nullable: false,
      description: 'The ID of an object',
      type: () => ID,
    })
    id: string,
  ) {
    return this.service.findCardById(id);
  }

  //   @Query(returnsNodeInterface, {
  //     name: 'node',
  //     description: 'Fetches an object given its ID',
  //     nullable: true,
  //   })
  //   node(
  //     @Args({
  //       name: 'id',
  //       nullable: false,
  //       description: 'The ID of an object',
  //       type: typeResolvedGlobalId,
  //     })
  //     id: ResolvedGlobalId,
  //   ): ResolvedNode {
  //     return this.resolveNode(id);
  //   }
}
