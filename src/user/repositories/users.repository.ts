import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { encryptPassword } from '../utils';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUserByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email: String(email) } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const user = this.create({
      email: createUserDto.email,
      username: createUserDto.username,
      password: encryptPassword(createUserDto.password),
    });

    return this.save(user);
  }
}
