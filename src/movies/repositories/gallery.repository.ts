import { EntityRepository, Repository } from 'typeorm';
import { Gallery } from '../entities/gallery.entity';

@EntityRepository(Gallery)
export class GalleryRepository extends Repository<Gallery> {
  getGalleryByMovieId(movieId: string): Promise<Gallery[]> {
    return this.find({
      where: { movieId: String(movieId) },
    });
  }
}
