import { FindManyOptionsCustom } from './pagination.types';
import { PaginationArgs } from './paginattion.args';

export function paginateResponse(data, page, limit) {
  const [result, total] = data;
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  return {
    data: [...result],
    count: total,
    currentPage: page,
    nextPage: nextPage,
    prevPage: prevPage,
    lastPage: lastPage,
  };
}

export const mdbPaginationOptionCreator = <T extends any>(
  args: PaginationArgs,
): FindManyOptionsCustom<T> => {
  const { start_date, end_date, page, limit } = args || {};
  const take = limit || 10;
  const pages = page || 1;
  const skip = (pages - 1) * take;
  const where =
    start_date && end_date
      ? {
          created_at: {
            $gte: new Date(start_date),
            $lt: new Date(end_date),
          },
        }
      : {};
  const order = {
    created_at: 'DESC',
  };
  const options: FindManyOptionsCustom<T> = args
    ? {
        where,
        take,
        skip,
        order,
      }
    : {};
  return options;
};
