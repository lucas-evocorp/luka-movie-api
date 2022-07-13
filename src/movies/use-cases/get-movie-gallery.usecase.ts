import { Injectable } from '@nestjs/common';
import { ApiNotfound } from 'src/core/exceptions/api-exception';
import { Gallery } from '../entities/gallery.entity';
import { GalleryRepository } from '../repositories/gallery.repository';
import { MoviesRepository } from '../repositories/movies.repository';

@Injectable()
export class GetMovieGalleryUseCase {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly galleryRepository: GalleryRepository,
  ) {}

  async execute(movieId: string): Promise<Gallery[]> {
    const movie = await this.moviesRepository.getMovieById(movieId);

    if (!movie) {
      throw new ApiNotfound('Ops! Filme não encotrado');
    }

    return this.galleryRepository.getGalleryByMovieId(movieId);
  }
}
