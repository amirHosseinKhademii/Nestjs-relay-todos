import { PaginationArgs } from 'src/args/paginattion.args';

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

export const mdbPaginationOptionCreator = (args: PaginationArgs) => {
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
  const options: any = args
    ? {
        where,
        take,
        skip,
        order,
      }
    : {};
  return options;
};
