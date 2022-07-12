import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { GetUserByEmailUseCase } from 'src/user/use-cases/get-user-by-email.usecase';
@Injectable()
export class AuthService {
  constructor(
    private jwtservice: JwtService,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}
  async validateUser(createauthdto: CreateAuthDto) {
    const user = await this.getUserByEmailUseCase.execute(createauthdto.email);
    if (user) {
      const typeuser = {
        id: user.id,
        email: user.email,
        username: user.username,
        imageUrl: user.imageUrl,
      };

      if (
        user &&
        createauthdto.email === user.email &&
        (await bcrypt.compare(createauthdto.password, user.password))
      ) {
        const payload = { username: user.email, sub: user.id };
        const token = this.jwtservice.sign(payload);

        return {
          user: typeuser,
          access_token: token,
        };
      }
      throw new BadRequestException('email ou senha não correspondem');
    }
    throw new BadRequestException('email ou senha não correspondem');
  }
}
