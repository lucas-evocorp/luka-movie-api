import { Injectable } from '@nestjs/common';
import { ApiNotfound } from 'src/core/exceptions/api-exception';
import { Movie } from '../entities/movie.entity';
import { MoviesRepository } from '../repositories/movies.repository';

@Injectable()
export class GetMovieByIdUseCase {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async execute(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.getMovieById(id);

    if (!movie) {
      throw new ApiNotfound('Ops! Filme não encontrado');
    }

    return movie;
  }
}
