import ItemService from '../src/services/item.service';
import { expect } from 'chai';
import 'mocha';

describe('Testing Item Service method getItem', () => {
  it('Returns a object', (done) => {
    ItemService.getItem('macbook', 4).then((res: any) => {
      expect(res).to.be.an('object');
      done();
    });
  });
});

describe('Testing Item Service method getItemById', () => {
  it('Returns a object', (done) => {
    ItemService.getItem('macbook', 4)
      .then((res: any) => res.items)
      .then((items: any) => {
        const id: string = items[0].id;
        ItemService.getItemById(id).then((res: any) => {
          expect(res).to.be.an('object');
          done();
        });
      });
  });
});
