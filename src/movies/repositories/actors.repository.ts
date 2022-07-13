import { EntityRepository, Repository } from 'typeorm';
import { Actor } from '../entities/actors.entity';

@EntityRepository(Actor)
export class ActorsRepository extends Repository<Actor> {
  getActorsByMovieId(movieId: string): Promise<Actor[]> {
    return this.createQueryBuilder('actors')
      .leftJoinAndSelect('actors.movieActors', 'movieActors')
      .where('movieActors.movieId = :id', { id: String(movieId) })
      .select('actors')
      .getMany();
  }
}
