import { Injectable } from '@nestjs/common';
import { ApiBadRequest, ApiNotfound } from 'src/core/exceptions/api-exception';
import { UsersRepository } from 'src/user/repositories/users.repository';
import { CommentsRepository } from '../repositories/comments.repository';

interface IExecuteParams {
  userId: string;
  commentId: string;
}

@Injectable()
export class DeleteMovieCommentByIdUseCase {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(params: IExecuteParams) {
    const { userId, commentId } = params;

    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw new ApiNotfound('Ops! Usuário não encontrado');
    }

    const comment = await this.commentsRepository.getCommentById(commentId);

    if (!comment) {
      throw new ApiNotfound('Ops! Comentário não encontrado');
    }

    if (comment.userId !== userId) {
      throw new ApiBadRequest(
        'Ops! Você não tem permissão para deletar este comentário',
      );
    }

    return this.commentsRepository.deleteCommentById(commentId);
  }
}
