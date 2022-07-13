import { Comment } from 'src/movies/entities/comments.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieFavorite } from '../../movies/entities/moviesfavorites.entity';

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

  @OneToMany(() => MovieFavorite, (moviesfavorites) => moviesfavorites.user, {
    cascade: true,
  })
  moviesfavorites: MovieFavorite[];

  @OneToMany(() => Comment, (comments) => comments.user, {})
  comment: Comment[];
}
