import { Item } from "./item";
import { Author } from "./author";

export class ItemResponse {
  author: Author;
  categories: any;
  items: Array<Item>;

  constructor(author: Author, categories: any, items: Array<Item>) {
    this.author = author;
    this.categories = categories;
    this.items = items;
  }
}
