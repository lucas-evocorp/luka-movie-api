import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actor } from './actors.entity';
import { Movie } from './movie.entity';

@Entity({ name: 'movies_actors' })
export class MovieActors {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movies) => movies.movieActors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movies: Movie[];

  @Column({ name: 'movie_id' })
  movieId: number;

  @ManyToOne(() => Actor, (actors) => actors.movieActors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'actor_id' })
  actors: Actor[];

  @Column({ name: 'actor_id' })
  actorId: number;
}
