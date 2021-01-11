import { Request, Response } from 'express';
import ItemService from '../services/item.service';

export function getItem(req: Request, res: Response) {
  const searchText: string = req.query.searchText as string;
  const amountResults: number = parseInt(req.query.amountResults as string, 10);

  ItemService.getItem(searchText, amountResults)
    .then((response: any) => {
      res.json(response);
    })
    .catch((error: any) => {
      res.send(error);
    });
}

export function getItemById(req: Request, res: Response) {
  ItemService.getItemById(req.params.id)
    .then((response: any) => {
      res.json(response);
    })
    .catch((error: any) => {
      res.send(error);
    });
}
