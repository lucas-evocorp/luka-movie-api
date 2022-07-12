import { IsEnum, IsString } from 'class-validator';
import { OrderDirectionEnum } from '../enums/order-direction.enum';

export class RequestSortDTO {
  @IsString()
  property: string;

  @IsEnum(OrderDirectionEnum)
  @IsString()
  order: OrderDirectionEnum;
}
