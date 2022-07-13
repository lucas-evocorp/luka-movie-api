import { Movie } from 'src/movies/entities/movie.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'movies_favorites' })
export class MovieFavorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (users) => users.moviesfavorites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @ManyToOne(() => Movie, (movies) => movies.moviesFavorites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movies: Movie[];

  @Column({ name: 'movie_id' })
  movieId: string;

  @Column({ name: 'user_id' })
  userId: string;
}
