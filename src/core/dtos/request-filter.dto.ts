import { IsString, ValidateNested } from 'class-validator';

export class RequestFilterItemDTO {
  @IsString()
  property: string;

  @IsString()
  value: string;
}

export class RequestFilterDTO {
  @ValidateNested()
  filters: RequestFilterItemDTO[];
}
