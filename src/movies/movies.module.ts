import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetMoviesUseCase } from './use-cases/get-movies.usecase';
import { UserModule } from 'src/user/user.module';
import { MoviesRepository } from './repositories/movies.repository';
import { GetMovieBackDropUseCase } from './use-cases/get-movie-backdrop.usecase';
import { GetMovieByIdUseCase } from './use-cases/get-movie-by-id.usecase';
import { ActorsRepository } from './repositories/actors.repository';
import { GetMovieActorsByMovieIdUseCase } from './use-cases/get-movie-actors.usecase';
import { GalleryRepository } from './repositories/gallery.repository';
import { GetMovieGalleryUseCase } from './use-cases/get-movie-gallery.usecase';
import { MoviesRecommendedsRepository } from './repositories/movies-recommendeds.repository';
import { GetMovieRecommendedsByMovieIdUseCase } from './use-cases/get-movie-recommendeds-by-movie-id.usecase';
import { CommentsRepository } from './repositories/comments.repository';
import { getMovieReviewsByMovieIdUseCase } from './use-cases/get-movie-reviews-by-movie-id.usecase';
import { CreateMovieFavoriteUseCase } from './use-cases/create-movie-favorite.usecase';
import { MoviesFavoritesRepository } from './repositories/movies-favorites.repository';
import { DeleteMovieCommentByIdUseCase } from './use-cases/delete-movie-comment-by-id.usecase';
import { DeleteMovieFavoriteUseCase } from './use-cases/delete-movie-favorite.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MoviesRepository,
      ActorsRepository,
      GalleryRepository,
      MoviesRecommendedsRepository,
      CommentsRepository,
      MoviesFavoritesRepository,
    ]),
    UserModule,
  ],
  controllers: [MoviesController],
  providers: [
    GetMoviesUseCase,
    GetMovieBackDropUseCase,
    GetMovieByIdUseCase,
    GetMovieActorsByMovieIdUseCase,
    GetMovieGalleryUseCase,
    GetMovieRecommendedsByMovieIdUseCase,
    getMovieReviewsByMovieIdUseCase,
    CreateMovieFavoriteUseCase,
    DeleteMovieCommentByIdUseCase,
    DeleteMovieFavoriteUseCase,
  ],
})
export class MoviesModule {}
