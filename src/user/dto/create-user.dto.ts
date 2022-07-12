import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotBlank } from 'src/auth/decorators/is-not-blank';
import { MessagesValidations as msgs } from 'src/core/constants';
export class CreateUserDto {
  @ApiProperty()
  @MinLength(4, { message: msgs.minLength('nome de usuario') })
  @MaxLength(100, { message: msgs.maxLength('nome de usuario') })
  @IsNotBlank()
  username: string;

  @ApiProperty()
  @MinLength(4, { message: msgs.minLength('email') })
  @MaxLength(100, { message: msgs.maxLength('email') })
  @IsEmail({}, { message: msgs.email() })
  @IsNotBlank()
  email: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(15)
  @IsString({ message: msgs.string('confirmar senha') })
  @IsNotBlank({ message: msgs.isNotBlank('senha') })
  password: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(100)
  @IsString({ message: msgs.string('confirmar senha') })
  @IsNotBlank({ message: msgs.isNotBlank('confirmar senha') })
  confirmPassword: string;
}
