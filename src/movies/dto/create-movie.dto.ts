import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  movieName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  synopsis: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  classification: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNotEmpty()
  duration: string;

  @ApiProperty()
  releaseDate: Date;
}
