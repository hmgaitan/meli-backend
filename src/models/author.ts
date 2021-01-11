export class Author {
  name: string;
  lastName: string;

  constructor(name?: string, lastName?: string) {
    this.name = name || 'Maximiliano';
    this.lastName = lastName || 'Gaitan';
  }
}
