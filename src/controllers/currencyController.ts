import { Request, Response } from 'express';
import CurrencyService from '../services/currency.service';

export function reload(req: Request, res: Response) {
  CurrencyService.reloadCurrencyList()
    .then((response: any) => {
      res.json('La lista de tipo de cambio fue recargada');
    })
    .catch((error: any) => {
      res.send(error);
    });
}
