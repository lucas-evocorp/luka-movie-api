import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Actor } from './entities/actors.entity';
import { Gallery } from './entities/gallery.entity';
import { MovieActors } from './entities/movie-actors.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from './entities/comments.entity';
import { MoviesRecommendeds } from './entities/movies-recommendations.entity';
import { GetMoviesUseCase } from './use-cases/get-movies.usecase';
import { UserModule } from 'src/user/user.module';
import { MoviesRepository } from './repositories/movies.repository';
import { GetMovieBackDropUseCase } from './use-cases/get-movie-backdrop.usecase';
import { GetMovieByIdUseCase } from './use-cases/get-movie-by-id.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie,
      Actor,
      Gallery,
      MovieActors,
      Comment,
      MoviesRecommendeds,
      MoviesRepository,
    ]),
    UserModule,
  ],
  controllers: [MoviesController],
  providers: [GetMoviesUseCase, GetMovieBackDropUseCase, GetMovieByIdUseCase],
})
export class MoviesModule {}
