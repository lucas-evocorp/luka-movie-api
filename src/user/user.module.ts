import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { MovieFavorite } from '../movies/entities/moviesfavorites.entity';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email.usecase';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserUseCase } from './use-cases/create-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieFavorite, UsersRepository])],
  exports: [TypeOrmModule, GetUserByEmailUseCase],
  controllers: [UserController],
  providers: [GetUserByEmailUseCase, CreateUserUseCase],
})
export class UserModule {}
