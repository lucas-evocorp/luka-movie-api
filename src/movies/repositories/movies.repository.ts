import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { ICustomQuery } from 'src/core/decorators/custom-query.decorator';
import { QueryUtil } from 'src/core/utils/query-util';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Movie } from '../entities/movie.entity';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async getMovies(query: ICustomQuery): Promise<Pagination<Movie>> {
    const queryBuilder = this.createQueryBuilder('movies').select([
      'movies.id',
      'movies.movieName',
      'movies.imageUrl',
      'movies.category',
    ]);

    const appliedFilters = query.filters;

    const availableFilters: any = {
      search: (
        queryBuilder: SelectQueryBuilder<Movie>,
        searchParam: string,
      ) => {
        return queryBuilder.andWhere('movies.movieName ILIKE :searchParam', {
          searchParam: `%${searchParam.trim()}%`,
        });
      },
    };

    const optionsPagination: IPaginationOptions = query.pagination;

    QueryUtil.applyFilters({ appliedFilters, availableFilters, queryBuilder });

    // console.log(await queryBuilder.getMany());

    return paginate<Movie>(queryBuilder, optionsPagination);
  }

  getMovieById(movieId: string) {
    return this.findOne({
      where: { id: String(movieId) },
    });
  }
}
