import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { IApiDocFilter } from '../interfaces/api-doc-filter';
import { IApiDocSort } from '../interfaces/api-doc-sort';

interface IApiQueryParamDefault {
  filter?: IApiDocFilter;
  sort?: IApiDocSort;
}

export function ApiQueryParamDefault(params?: IApiQueryParamDefault) {
  const querys = [
    ApiQuery({ name: 'page', required: false, type: 'number' }),
    ApiQuery({ name: 'offset', required: false, type: 'number' }),
    ApiQuery({ name: 'limit', required: false, type: 'number' }),
  ];

  if (params?.filter) {
    querys.push(
      ApiQuery({
        name: 'filters',
        required: false,
        description: `Filters to search: ${params?.filter?.available.join(
          ', ',
        )}`,
        example: `[{"property": "${params?.filter?.example?.property}", "value": "${params?.filter?.example?.value}"}]`,
      }),
    );
  }

  if (params?.sort) {
    querys.push(
      ApiQuery({
        name: 'sort',
        required: false,
        description: `Sort by: ${params?.sort?.available.join(', ')}`,
        example: `{"property": "${params?.sort?.example?.property}", "order": "${params?.sort?.example?.order}"}`,
      }),
    );
  }

  return applyDecorators(...querys);
}
