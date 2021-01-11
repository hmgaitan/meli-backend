import CurrencyService from '../src/services/currency.service';
import { expect } from 'chai';
import 'mocha';

describe('Testing Currency Service method getCurrencyList', () => {
  it('Returns array', (done) => {
    CurrencyService.getCurrencyList().then((res: any) => {
      expect(res).to.be.an('array');
      done();
    });
  });
});

describe('Testing Currency Service method getCurrencyList', () => {
  it('Returns boolean [true]', (done) => {
    CurrencyService.reloadCurrencyList().then((res: any) => {
      expect(res).to.equal(true);
      done();
    });
  });
});
