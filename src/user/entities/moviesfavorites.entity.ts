import { Movie } from 'src/movies/entities/movie.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'movies_favorites' })
export class MoviesFavorites {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (users) => users.moviesfavorites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @ManyToOne(() => Movie, (movies) => movies.moviesfavorites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movies: Movie[];

  @Column({ name: 'movie_id' })
  moviesId: number;

  @Column({ name: 'user_id' })
  usersId: number;
}
