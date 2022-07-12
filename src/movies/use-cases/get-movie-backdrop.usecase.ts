import { Injectable } from '@nestjs/common';
import { ApiNotfound } from 'src/core/exceptions/api-exception';
import { MoviesRepository } from '../repositories/movies.repository';

interface IExecuteResponse {
  backdropUrl: string;
}

@Injectable()
export class GetMovieBackDropUseCase {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async execute(movieId: string): Promise<IExecuteResponse> {
    const movie = await this.moviesRepository.getMovieById(movieId);

    if (!movie) {
      throw new ApiNotfound('Ops! Filme não encontrado');
    }

    return { backdropUrl: movie.backdropUrl };
  }
}
