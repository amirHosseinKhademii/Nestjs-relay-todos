import { Query, Args, Resolver, ID } from '@nestjs/graphql';
import { NodeInterface } from '../relay.types';

@Resolver(() => NodeInterface)
export class NodeFieldResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolveNode(id: string) {
    throw new Error('Method not implemented.');
  }

  @Query(() => NodeInterface, {
    name: 'node',
    nullable: true,
  })
  node(
    @Args({
      name: 'id',
      nullable: false,
      type: () => ID,
    })
    id: string,
  ) {
    return this.resolveNode(id);
  }

  //   @Query(returnsNodeInterfaces, {
  //     name: 'nodes',
  //     description: 'Fetches objects given their IDs',
  //     nullable: 'items',
  //   })
  //   nodes(
  //     @Args({
  //       name: 'ids',
  //       nullable: false,
  //       description: 'The IDs of objects',
  //       type: () => ID,
  //     })
  //     ids: string[],
  //   ): Promise<ResolvedNode[]> {
  //     return Promise.all(ids.map((id) => Promise.resolve(this.resolveNode(id))));
  //   }
}
