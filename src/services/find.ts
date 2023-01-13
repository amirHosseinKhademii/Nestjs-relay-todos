import { connectionFromArraySlice } from 'graphql-relay';
import { ConnectionArgs, getPagingParameters } from 'src/relay';
import { FindOptionsWhere, Repository } from 'typeorm';

export const findAll = async <T>(
  args: ConnectionArgs,
  repo: Repository<T>,
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
) => {
  const { limit, offset } = getPagingParameters(args);
  const [results, count] = await repo.findAndCount({
    take: limit,
    skip: offset,
    ...(where && { where }),
  });

  return connectionFromArraySlice(results, args, {
    arrayLength: count,
    sliceStart: offset || 0,
  });
};
