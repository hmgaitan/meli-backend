import { Price } from "./price";
import { Item } from "./item";

export class ItemDetail extends Item {
  sold_quantity: number;
  description: any;
  categories: Array<any>[];

  constructor(
    id: string,
    title: string,
    price: Price,
    picture: string,
    condition: string,
    free_shipping: string,
    sold_quantity: number,
    description: string,
    categories: Array<any>
  ) {
    super(id, title, price, picture, condition, free_shipping);
    this.sold_quantity = sold_quantity;
    this.description = description;
    this.categories = categories;
  }
}
