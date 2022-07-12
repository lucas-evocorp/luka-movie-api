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
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
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
} from 'src/core/utils/response.util';
import { GetMovieBackDropUseCase } from './use-cases/get-movie-backdrop.usecase';
import { GetMovieByIdUseCase } from './use-cases/get-movie-by-id.usecase';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly getMoviesUseCase: GetMoviesUseCase,
    private readonly getMovieBackDropUseCase: GetMovieBackDropUseCase,
    private readonly getMovieByIdUseCase: GetMovieByIdUseCase,
  ) {}

  // ja fiz
  @Get()
  async getMovies(
    @CustomQuery() query: ICustomQuery,
  ): Promise<IResponseApiData> {
    const movies = await this.getMoviesUseCase.execute(query);
    return responseApiData(movies);
  }

  @Get(':movieId/backdrop')
  async findBackdropByMovie(@Param('movieId') movieId: string) {
    const backdropUrl = await this.getMovieBackDropUseCase.execute(movieId);

    return responseApiData({ backdropUrl });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const movie = await this.getMovieByIdUseCase.execute(id);

    return responseApiData(movie);
  }
  //falta fazer

  @Get('moviesrecommendeds/:movieid')
  async findRecommendedsMovies(@Param('movieid') movieid: number) {}

  @Get('moviegallery/:movieid')
  async findMovieGallery(@Param('movieid') movieid: number) {}

  @Get('moviecomments/:movieId')
  async findMovierReviews(
    @Param('movieId') movieId: number,
    @Query('page') page: number,
  ) {}

  @Get('allmoviecomments')
  async findAllMovieComments() {}

  @Get('movieactors/:movieid')
  async findMovieActors(@Param('movieid') movieId: number) {}

  @Get('currentmovies')
  async findReleases() {}

  @ApiQueryParamDefault({
    filter: {
      available: ['search'],
      example: { property: 'search', value: 'spider-man' },
    },
  })
  @ApiOkResponse({ description: 'Ok' })
  @Delete(':id')
  async remove(@Param('id') id: number) {}

  @UseGuards(AuthGuard('jwt'))
  @Delete('deletemoviecomment/:id')
  async removeComment(
    @UserAuth() userAuth: IuserAuth,
    @Param('id') commentId: number,
  ) {}

  //  rotas para filmes favoritos
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('createmoviefavorite/:id')
  async favoritemovie(
    @UserAuth() usuarioAuth: IuserAuth,
    @Param('id') movieId: number,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Delete('deletemoviefavorite/:id')
  async deletefavoritemovie(
    @UserAuth() usuarioAuth: IuserAuth,
    @Param('id') movieId: number,
  ) {}
}
