import { Comment } from 'src/movies/entities/comments.entity';
import { Gallery } from './gallery.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieActors } from './movie-actors.entity';
import { MoviesRecommendeds } from './movies-recommendations.entity';
import { MovieFavorite } from './moviesfavorites.entity';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'movie_name' })
  movieName: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column()
  synopsis: string;

  @Column({ type: 'float' })
  classification: number;

  @Column()
  category: string;

  @Column()
  duration: string;

  @Column({ name: 'release_date', type: 'date' })
  releaseDate: Date;

  @Column({ nullable: true, type: 'float' })
  price?: number;

  @OneToMany(() => Gallery, (gallery) => gallery.movies, {
    onDelete: 'CASCADE',
  })
  gallery: Gallery[];

  @OneToMany(() => MovieActors, (moviesactors) => moviesactors.movies, {
    onDelete: 'CASCADE',
  })
  movieActors: MovieActors[];

  @OneToMany(() => MovieFavorite, (moviesfavorites) => moviesfavorites.movies, {
    onDelete: 'CASCADE',
  })
  moviesFavorites: MovieFavorite[];

  @OneToMany(() => Comment, (comments) => comments.movie)
  comments: Comment[];

  @OneToMany(
    () => MoviesRecommendeds,
    (moviesrecommendeds) => moviesrecommendeds.movie,
  )
  moviesrecommendeds: MoviesRecommendeds[];

  @Column({ name: 'backdrop_url', nullable: true })
  backdropUrl: string;
}
