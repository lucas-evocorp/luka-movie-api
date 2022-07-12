import { OrderDirectionEnum } from '../enums/order-direction.enum';

export interface IApiDocSort {
  available: string[];
  example: {
    property: string;
    order: OrderDirectionEnum;
  };
}
