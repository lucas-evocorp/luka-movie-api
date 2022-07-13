import { EntityRepository, Repository } from 'typeorm';
import { MoviesRecommendeds } from '../entities/movies-recommendations.entity';

@EntityRepository(MoviesRecommendeds)
export class MoviesRecommendedsRepository extends Repository<MoviesRecommendeds> {
  getMoviesRecommendedsByMovieid(
    movieId: string,
  ): Promise<MoviesRecommendeds[]> {
    return this.find({
      where: { movieId: String(movieId) },
    });
  }
}
