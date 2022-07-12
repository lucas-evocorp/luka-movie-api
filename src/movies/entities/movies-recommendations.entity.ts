import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity({ name: 'movies_recommendations' })
export class MoviesRecommendeds {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movies) => movies.moviesrecommendeds)
  @JoinColumn({ name: 'movie_id' })
  movieSon: Movie[];

  @Column({ name: 'movie_id' })
  movieId: number;

  @ManyToOne(() => Movie, (movies) => movies.moviesrecommendeds)
  @JoinColumn({ name: 'recommended_movie' })
  movie: Movie[];

  @Column({ name: 'recommended_movie' })
  moviesRecommendeds: number;
}
