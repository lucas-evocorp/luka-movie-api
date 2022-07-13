import { Injectable } from '@nestjs/common';
import { ApiNotfound } from 'src/core/exceptions/api-exception';
import { Actor } from '../entities/actors.entity';
import { ActorsRepository } from '../repositories/actors.repository';
import { MoviesRepository } from '../repositories/movies.repository';

@Injectable()
export class GetMovieActorsByMovieIdUseCase {
  constructor(
    private readonly actorsRepository: ActorsRepository,
    private readonly moviesRepository: MoviesRepository,
  ) {}

  async execute(movieId: string): Promise<Actor[]> {
    const movie = await this.moviesRepository.getMovieById(movieId);

    if (!movie) {
      throw new ApiNotfound('Ops! Filme não encontrado');
    }

    return this.actorsRepository.getActorsByMovieId(movieId);
  }
}
