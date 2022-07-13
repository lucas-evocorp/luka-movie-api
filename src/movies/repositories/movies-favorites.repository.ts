import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { ICustomQuery } from 'src/core/decorators/custom-query.decorator';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { MovieFavorite } from '../entities/moviesfavorites.entity';

@EntityRepository(MovieFavorite)
export class MoviesFavoritesRepository extends Repository<MovieFavorite> {
  async getMoviesFavoritesByUserId(
    query: ICustomQuery,
    userId: string,
  ): Promise<Pagination<MovieFavorite>> {
    const queryBuilder = this.createQueryBuilder('moviefavorite').where(
      'moviefavorite.userId = :userId',
      { userId },
    );

    const optionsPagination: IPaginationOptions = query.pagination;

    return paginate<MovieFavorite>(queryBuilder, optionsPagination);
  }

  async createMovieFavorite(
    userId: string,
    movieId: string,
  ): Promise<MovieFavorite> {
    const moviefavorite = this.create({
      userId: String(userId),
      movieId: String(movieId),
    });

    return this.save(moviefavorite);
  }

  async deleteMovieFavoriteByMovieId(movieId: string): Promise<DeleteResult> {
    return this.delete({ movieId: String(movieId) });
  }

  getMovieFavoriteByMovieId(movieId: string) {
    return this.findOne({ movieId: String(movieId) });
  }
}
