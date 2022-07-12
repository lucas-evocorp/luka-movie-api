import { Comment } from 'src/movies/entities/comments.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MoviesFavorites } from './moviesfavorites.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl: string;

  @Column()
  password: string;

  @OneToMany(() => MoviesFavorites, (moviesfavorites) => moviesfavorites.user, {
    cascade: true,
  })
  moviesfavorites: MoviesFavorites[];

  @OneToMany(() => Comment, (comments) => comments.user, {})
  comment: Comment[];
}
