import { Injectable } from '@nestjs/common';
import { ApiBadRequest } from 'src/core/exceptions/api-exception';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const checkEmailExist = await this.usersRepository.getUserByEmail(
      createUserDto.email,
    );

    if (checkEmailExist) {
      throw new ApiBadRequest('Ops! Esse email já está sendo utilizado');
    }

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new ApiBadRequest('Ops! as senhas não correspondem');
    }

    return await this.usersRepository.createUser(createUserDto);
  }
}
