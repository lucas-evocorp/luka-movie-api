import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieActors } from './movie-actors.entity';
import { Movie } from './movie.entity';

@Entity({ name: 'actors' })
export class Actor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image_url: string;

  @OneToMany(() => MovieActors, (movieactors) => movieactors.actors)
  movieactor: MovieActors[];
}
