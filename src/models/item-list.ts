import { Price } from './price';
import { Item } from './item';

export class ItemList extends Item {
  address: string;

  constructor(
    id: string,
    title: string,
    price: Price,
    picture: string,
    condition: string,
    free_shipping: string,
    address: string
  ) {
    super(id, title, price, picture, condition, free_shipping);
    this.address = address;
  }
}
