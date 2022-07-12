import { Movie } from 'src/movies/entities/movie.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'galleries' })
export class Gallery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @ManyToOne(() => Movie, (movies) => movies.gallery, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movies: Movie[];

  @Column({ name: 'movie_id' })
  moviesId: number;
}
