import { Injectable } from '@nestjs/common';
import { ApiNotfound } from 'src/core/exceptions/api-exception';
import { UsersRepository } from 'src/user/repositories/users.repository';
import { MoviesFavoritesRepository } from '../repositories/movies-favorites.repository';
import { MoviesRepository } from '../repositories/movies.repository';

@Injectable()
export class CreateMovieFavoriteUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly moviesRepository: MoviesRepository,
    private readonly moviesFavoritesRepository: MoviesFavoritesRepository,
  ) {}

  async execute(userId: string, movieId: string) {
    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw new ApiNotfound('Ops! Usuário não encontrado');
    }

    const movie = await this.moviesRepository.getMovieById(movieId);

    if (!movie) {
      throw new ApiNotfound('Ops! Filme não encontrado');
    }

    return this.moviesFavoritesRepository.createMovieFavorite(
      user.id,
      movie.id,
    );
  }
}
