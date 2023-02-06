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

  @Query(() => [NodeInterface], {
    name: 'nodes',
    nullable: true,
  })
  nodes(
    @Args({
      name: 'ids',
      nullable: false,
      type: () => ID,
    })
    ids: string[],
  ) {
    return Promise.all(ids.map((id) => Promise.resolve(this.resolveNode(id))));
  }
}
