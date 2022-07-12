import { Injectable } from '@nestjs/common';
import { ApiNotfound } from 'src/core/exceptions/api-exception';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new ApiNotfound('Ops! usuario não encontrado');
    }

    return user;
  }
}
