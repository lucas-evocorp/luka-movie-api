import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(createauthdto: CreateAuthDto): Promise<any> {
    console.log(createauthdto);

    const user = await this.authService.validateUser(createauthdto);
    if (!user) {
      throw new UnauthorizedException('você não está autenticado');
    }
    return user;
  }
}
