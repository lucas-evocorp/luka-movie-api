import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { ICustomQuery } from 'src/core/decorators/custom-query.decorator';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Comment } from '../entities/comments.entity';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async getCommentsByMovieId(
    query: ICustomQuery,
    movieId: string,
  ): Promise<Pagination<Comment>> {
    const queryBuilder = this.createQueryBuilder('comment').where(
      'comment.movieId = :movieId',
      { movieId },
    );

    const optionsPagination: IPaginationOptions = query.pagination;

    return paginate<Comment>(queryBuilder, optionsPagination);
  }

  async deleteCommentById(commentId: string): Promise<DeleteResult> {
    return this.delete({ id: String(commentId) });
  }

  async getCommentById(commentId: string): Promise<Comment> {
    return this.findOne({ id: String(commentId) });
  }
}
