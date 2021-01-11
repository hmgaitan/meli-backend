import { Price } from './price';

export class Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: string;

  constructor(
    id: string,
    title: string,
    price: Price,
    picture: string,
    condition: string,
    free_shipping: string
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.picture = picture;
    this.condition = condition;
    this.free_shipping = free_shipping;
  }
}
