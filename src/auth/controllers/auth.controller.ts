import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { LoginUseCase } from '../use-cases/login.usecase';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.loginUseCase.execute(createAuthDto);
  }
}
