import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  RequestFilterDTO,
  RequestFilterItemDTO,
} from '../dtos/request-filter.dto';
import { RequestSortDTO } from '../dtos/request-sort.dto';
import { ApiBadRequest } from '../exceptions/api-exception';

interface IApplyFiltersParams {
  queryBuilder: any;
  availableFilters: any;
  appliedFilters: RequestFilterItemDTO[];
}

interface IApplySortParams {
  queryBuilder: any;
  appliedSort: RequestSortDTO;
  availableSort: any;
}

export class QueryUtil {
  static applyFilters(params: IApplyFiltersParams) {
    const { queryBuilder, appliedFilters, availableFilters } = params;

    appliedFilters.forEach((filter) => {
      if (availableFilters[filter.property]) {
        const fnByProperty = availableFilters[filter.property];

        if (typeof fnByProperty === 'function') {
          fnByProperty(params.queryBuilder, filter.value, appliedFilters);
        }
      }
    });

    return queryBuilder;
  }

  static applySort({
    appliedSort,
    availableSort,
    queryBuilder,
  }: IApplySortParams) {
    const fnByProperty = availableSort[appliedSort?.property];

    if (typeof fnByProperty === 'function') {
      fnByProperty(queryBuilder, appliedSort.order.toUpperCase());
    }

    return queryBuilder;
  }

  static async getFiltersByQueryString(
    queryStringFilters: string,
  ): Promise<RequestFilterItemDTO[]> {
    try {
      const plainFilters = plainToInstance(
        RequestFilterItemDTO,
        <any[]>JSON.parse(queryStringFilters || '[]'),
      );

      const dto = new RequestFilterDTO();
      dto.filters = plainFilters;

      const errors = await validate(dto);

      if (errors.length > 0) {
        throw new Error();
      }

      return plainFilters;
    } catch (error) {
      throw new ApiBadRequest('Ops! Por favor informe filtros válidos');
    }
  }

  static async getSortByQueryString(
    queryStringSort: string,
  ): Promise<RequestSortDTO> {
    try {
      const plaintItemSort = plainToInstance(
        RequestSortDTO,
        <any>JSON.parse(queryStringSort || ''),
      );

      const dto = new RequestSortDTO();
      dto.property = plaintItemSort.property;
      dto.order = plaintItemSort.order;

      const errors = await validate(dto);

      if (errors.length > 0) {
        throw new Error();
      }

      return plaintItemSort;
    } catch (error) {
      throw new ApiBadRequest('Ops! Por favor informe uma ordenação válida');
    }
  }
}
