import { Injectable } from '@nestjs/common';
import { ICustomQuery } from 'src/core/decorators/custom-query.decorator';
import { ApiNotfound } from 'src/core/exceptions/api-exception';
import { CommentsRepository } from '../repositories/comments.repository';
import { MoviesRepository } from '../repositories/movies.repository';

@Injectable()
export class getMovieReviewsByMovieIdUseCase {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly moviesRepository: MoviesRepository,
  ) {}
  async execute(query: ICustomQuery, movieId: string) {
    const movie = await this.moviesRepository.getMovieById(movieId);

    if (!movie) {
      throw new ApiNotfound('Ops! Filme não encontrado');
    }

    return this.commentsRepository.getCommentsByMovieId(query, movieId);
  }
}
