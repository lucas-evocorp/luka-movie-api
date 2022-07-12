import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Query } from '../constants';
import { RequestFilterItemDTO } from '../dtos/request-filter.dto';
import { RequestSortDTO } from '../dtos/request-sort.dto';
import { QueryUtil } from '../utils/query-util';

export interface IRequestQuery {
  page: string;
  offset?: string;
  limit: string;
  filters: RequestFilterItemDTO[];
  sort: RequestSortDTO;
}

export interface ICustomQuery {
  filters?: RequestFilterItemDTO[];
  sort?: RequestSortDTO;
  pagination: {
    page: number;
    offset?: number;
    limit: number;
    route: string;
  };
}

const QueryResolveDecorator = async (
  data: unknown,
  ctx: ExecutionContext,
): Promise<ICustomQuery> => {
  const req = ctx.switchToHttp().getRequest();
  const reqQuery: IRequestQuery = req.query;
  const offset = Number(reqQuery.offset) ?? 0;
  const page = Number(reqQuery.page) || offset + 1 || Query.FIRST_PAGE;
  const limit = Number(reqQuery.limit) || 0;
  const filters = reqQuery?.filters;
  const sort = reqQuery?.sort;
  const appliedFilters = filters
    ? await QueryUtil.getFiltersByQueryString(String(filters))
    : [];
  const appliedSort = sort
    ? await QueryUtil.getSortByQueryString(String(sort))
    : null;
  const route = req.route;
  const minLimit = limit <= 0 ? Query.MIN_LIMIT_PER_PAGE : null;
  const maxLimitOrLimit =
    limit > Query.MAX_LIMIT_PER_PAGE ? Query.MAX_LIMIT_PER_PAGE : limit;

  return {
    filters: appliedFilters,
    sort: appliedSort,
    pagination: {
      limit: minLimit || maxLimitOrLimit,
      route: `${process.env.APP_URL}${route.path}`,
      page,
    },
  };
};

export const CustomQuery = createParamDecorator(QueryResolveDecorator);
