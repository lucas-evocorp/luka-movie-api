import { Injectable } from '@nestjs/common';
import { ApiBadRequest, ApiNotfound } from 'src/core/exceptions/api-exception';
import { UsersRepository } from 'src/user/repositories/users.repository';
import { MoviesFavoritesRepository } from '../repositories/movies-favorites.repository';
import { MoviesRepository } from '../repositories/movies.repository';
interface IExecuteParams {
  userId: string;
  movieId: string;
}

@Injectable()
export class DeleteMovieFavoriteUseCase {
  constructor(
    private readonly moviesFavoritesRepository: MoviesFavoritesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly moviesRepository: MoviesRepository,
  ) {}
  async execute(params: IExecuteParams) {
    const { userId, movieId } = params;

    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw new ApiNotfound('Ops! Usuário não encontrado');
    }

    const movie = await this.moviesRepository.getMovieById(movieId);

    if (!movie) {
      throw new ApiNotfound('Ops! Filme não encontrado');
    }

    const movieFavorite =
      await this.moviesFavoritesRepository.getMovieFavoriteByMovieId(movieId);

    if (movieFavorite.userId !== userId) {
      throw new ApiBadRequest(
        'Ops! Você não tem permissão para remover este filme',
      );
    }

    return this.moviesFavoritesRepository.deleteMovieFavoriteByMovieId(
      movie.id,
    );
  }
}
