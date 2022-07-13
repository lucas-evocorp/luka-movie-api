import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserAuth } from 'src/auth/decorators/user-auth';
import { IuserAuth } from 'src/auth/interfaces/IUserAuth.interface';
import { ApiQueryParamDefault } from 'src/core/decorators/api-query-param-default.decorator';
import {
  CustomQuery,
  ICustomQuery,
} from 'src/core/decorators/custom-query.decorator';
import { GetMoviesUseCase } from './use-cases/get-movies.usecase';
import {
  IResponseApiData,
  responseApiData,
  responseApiOk,
} from 'src/core/utils/response.util';
import { GetMovieBackDropUseCase } from './use-cases/get-movie-backdrop.usecase';
import { GetMovieByIdUseCase } from './use-cases/get-movie-by-id.usecase';
import { GetMovieActorsByMovieIdUseCase } from './use-cases/get-movie-actors.usecase';
import { GetMovieGalleryUseCase } from './use-cases/get-movie-gallery.usecase';
import { GetMovieRecommendedsByMovieIdUseCase } from './use-cases/get-movie-recommendeds-by-movie-id.usecase';
import { getMovieReviewsByMovieIdUseCase } from './use-cases/get-movie-reviews-by-movie-id.usecase';
import { CreateMovieFavoriteUseCase } from './use-cases/create-movie-favorite.usecase';
import { DeleteMovieCommentByIdUseCase } from './use-cases/delete-movie-comment-by-id.usecase';
import { DeleteMovieFavoriteUseCase } from './use-cases/delete-movie-favorite.usecase';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly getMoviesUseCase: GetMoviesUseCase,
    private readonly getMovieBackDropUseCase: GetMovieBackDropUseCase,
    private readonly getMovieByIdUseCase: GetMovieByIdUseCase,
    private readonly getMovieActorsByMovieIdUseCase: GetMovieActorsByMovieIdUseCase,
    private readonly getMovieGalleryUseCase: GetMovieGalleryUseCase,
    private readonly getMoviesRecommendedsByMovieIdUseCase: GetMovieRecommendedsByMovieIdUseCase,
    private readonly getMovieReviewsUseCase: getMovieReviewsByMovieIdUseCase,
    private readonly createMovieFavoriteUseCase: CreateMovieFavoriteUseCase,
    private readonly deleteMovieCommentByIdUseCase: DeleteMovieCommentByIdUseCase,
    private readonly deleteMovieFavoriteUseCase: DeleteMovieFavoriteUseCase,
  ) {}
  // ja fiz
  @ApiQueryParamDefault({
    filter: {
      available: ['search'],
      example: { property: 'search', value: 'spider-man' },
    },
  })
  @Get()
  async getMovies(
    @CustomQuery() query: ICustomQuery,
  ): Promise<IResponseApiData> {
    const movies = await this.getMoviesUseCase.execute(query);
    return responseApiData(movies);
  }

  @Get(':movieId/backdrop')
  async findBackdropByMovie(
    @Param('movieId') movieId: string,
  ): Promise<IResponseApiData> {
    const backdropUrl = await this.getMovieBackDropUseCase.execute(movieId);

    return responseApiData({ backdropUrl });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponseApiData> {
    const movie = await this.getMovieByIdUseCase.execute(id);

    return responseApiData(movie);
  }

  @Get(':movieId/actors')
  async getMovieActors(
    @Param('movieId') movieId: string,
  ): Promise<IResponseApiData> {
    const actors = await this.getMovieActorsByMovieIdUseCase.execute(movieId);

    return responseApiData(actors);
  }

  @Get(':movieId/gallery')
  async getMovieGallery(
    @Param('movieId') movieId: string,
  ): Promise<IResponseApiData> {
    const gallery = await this.getMovieGalleryUseCase.execute(movieId);

    return responseApiData(gallery);
  }

  @Get('moviesrecommendeds/:movieid')
  async getMovieRecommendeds(
    @Param('movieid') movieId: string,
  ): Promise<IResponseApiData> {
    const moviesRecommendeds =
      await this.getMoviesRecommendedsByMovieIdUseCase.execute(movieId);

    return responseApiData(moviesRecommendeds);
  }

  @Get('moviecomments/:movieId')
  async getMovieReviews(
    @Param('movieId') movieId: string,
    @CustomQuery() query: ICustomQuery,
  ) {
    const reviews = await this.getMovieReviewsUseCase.execute(query, movieId);

    return responseApiData(reviews);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':commentId/deletemoviecomment')
  async removeComment(
    @UserAuth() userAuth: IuserAuth,
    @Param('id') commentId: string,
  ) {
    await this.deleteMovieCommentByIdUseCase.execute({
      commentId,
      userId: userAuth.userId,
    });

    return responseApiOk('Comentário removido com sucesso');
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post(':movieId/createmoviefavorite')
  async favoritemovie(
    @UserAuth() usuarioAuth: IuserAuth,
    @Param('movieId') movieId: string,
  ) {
    const movieFavorite = await this.createMovieFavoriteUseCase.execute(
      usuarioAuth.userId,
      movieId,
    );

    return responseApiOk('Filme favoritado com sucesso', movieFavorite);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('deletemoviefavorite/:id')
  async deletefavoritemovie(
    @UserAuth() usuarioAuth: IuserAuth,
    @Param('id') movieId: string,
  ) {
    const movieFavorite = await this.deleteMovieFavoriteUseCase.execute({
      userId: usuarioAuth.userId,
      movieId,
    });

    return responseApiOk(
      'Filme removido dos favoritos com sucesso',
      movieFavorite,
    );
  }
}
