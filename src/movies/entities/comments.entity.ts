import { ApiHideProperty } from '@nestjs/swagger';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'text' })
  text: string;

  @CreateDateColumn({ name: 'date' })
  date: Date;

  @ManyToOne(() => User, (users) => users.comment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @Column({ nullable: true, name: 'user_id' })
  userId: number;

  @ManyToOne(() => Movie, (movies) => movies.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie[];

  @Column({ nullable: true, name: 'movie_id' })
  moviesId: number;
}
