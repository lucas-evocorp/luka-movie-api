import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, MinLength } from 'class-validator';
export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  text: string;
}
