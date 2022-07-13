import { Injectable } from '@nestjs/common';
import { ApiNotfound } from 'src/core/exceptions/api-exception';
import { MoviesRecommendeds } from '../entities/movies-recommendations.entity';
import { MoviesRecommendedsRepository } from '../repositories/movies-recommendeds.repository';
import { MoviesRepository } from '../repositories/movies.repository';

@Injectable()
export class GetMovieRecommendedsByMovieIdUseCase {
  constructor(
    private readonly moviesRecommendedsRepository: MoviesRecommendedsRepository,
    private readonly moviesRepository: MoviesRepository,
  ) {}

  async execute(movieId: string): Promise<MoviesRecommendeds[]> {
    const movie = await this.moviesRepository.getMovieById(movieId);

    if (!movie) {
      throw new ApiNotfound('Ops! Filme não encontrado');
    }

    return this.moviesRecommendedsRepository.getMoviesRecommendedsByMovieid(
      movieId,
    );
  }
}
