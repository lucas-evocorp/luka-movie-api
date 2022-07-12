import { Injectable } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ICustomQuery } from 'src/core/decorators/custom-query.decorator';
import { Movie } from '../entities/movie.entity';
import { MoviesRepository } from '../repositories/movies.repository';

@Injectable()
export class GetMoviesUseCase {
  constructor(private readonly moviesRepository: MoviesRepository) {}
  async execute(query: ICustomQuery): Promise<Pagination<Movie>> {
    return await this.moviesRepository.getMovies(query);
  }
}
