import { ItemList } from '../models/item-list';
import { ItemResponse } from '../models/item-response';
import { ItemDetail } from '../models/item-detail';
import { Price } from '../models/price';
import { Author } from '../models/author';
import ConnectionAPI from './api.service';
import CurrencyService from './currency.service';

const items = { getItemById, getItem };
const author = new Author();

function getItemById(id: string) {
  let request = {
    method: 'items',
    type: 'url',
    params: id,
  };

  return new Promise((resolve, reject) => {
    ConnectionAPI.senderRequest(request, 'GET')
      .then((data: any) => {
        let currencyList: Array<any> = [];
        let itemData: ItemDetail = new ItemDetail(
          data.id,
          data.title,
          new Price(data.price, data.currency_id, 0),
          data.thumbnail,
          data.condition,
          data.shipping.free_shipping,
          data.sold_quantity,
          '',
          []
        );

        request.params = id + '/description';

        CurrencyService.getCurrencyList()
          .then((response: any) => {
            currencyList = response;
            let currency: any = currencyList.find((currency: any) => {
              return currency.id == data.currency_id;
            });
            let amountDecimals: number = currency ? currency.decimal_places : 0;
            let symbol: string = currency ? currency.symbol : data.currency_id;
            itemData.price.decimals = amountDecimals;
            itemData.price.currency = symbol;
            getCategoryDataById(data.category_id)
              .then((categoryList: any) => {
                itemData.categories = categoryList;
                getProductDescriptionById(request)
                  .then((description) => {
                    itemData.description = description;
                    resolve(itemData);
                  })
                  .catch((error: any) => {
                    resolve(itemData);
                  });
              })
              .catch((error: any) => {
                getProductDescriptionById(request)
                  .then((description) => {
                    itemData.description = description;
                    resolve(itemData);
                  })
                  .catch((error: any) => {
                    resolve(itemData);
                  });
              });
          })
          .catch((error: any) => {
            getCategoryDataById(data.category_id)
              .then((categoryList: any) => {
                itemData.categories = categoryList;
                getProductDescriptionById(request)
                  .then((description) => {
                    itemData.description = description;
                    resolve(itemData);
                  })
                  .catch((error: any) => {
                    resolve(itemData);
                  });
              })
              .catch((error: any) => {
                getProductDescriptionById(request)
                  .then((description) => {
                    itemData.description = description;
                    resolve(itemData);
                  })
                  .catch((error: any) => {
                    resolve(itemData);
                  });
              });
          });
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

function getProductDescriptionById(request: any) {
  return new Promise((resolve, reject) => {
    ConnectionAPI.senderRequest(request, 'GET')
      .then((data: any) => {
        resolve(data.plain_text);
      })
      .catch(function (error: any) {
        reject(error);
      });
  });
}

function getItem(searchText: string, amountResultMax: number) {
  let request = {
    method: 'sites/MLA/search',
    type: 'query',
    params: {
      q: searchText,
    },
  };

  return new Promise((resolve, reject) => {
    ConnectionAPI.senderRequest(request, 'GET')
      .then((data: any) => {
        const categoryId: string = data.results[0].category_id || 'MLA82085';

        getCategoryDataById(categoryId)
          .then((categoryList: any) => {
            let currencyList: Array<any> = [];
            CurrencyService.getCurrencyList()
              .then((response: any) => {
                currencyList = response;
                resolve(
                  getProductResponseFormatted(
                    data,
                    amountResultMax,
                    currencyList,
                    categoryList
                  )
                );
              })
              .catch(() => {
                resolve(
                  getProductResponseFormatted(
                    data,
                    amountResultMax,
                    currencyList,
                    categoryList
                  )
                );
              });
          })
          .catch((error: any) => {
            let currencyList: Array<any> = [];
            CurrencyService.getCurrencyList()
              .then((response: any) => {
                currencyList = response;
                resolve(
                  getProductResponseFormatted(
                    data,
                    amountResultMax,
                    currencyList
                  )
                );
              })
              .catch(() => {
                resolve(
                  getProductResponseFormatted(
                    data,
                    amountResultMax,
                    currencyList
                  )
                );
              });
          });
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

function getCategoryDataById(id: string) {
  let request = {
    method: 'categories',
    type: 'url',
    params: id,
  };

  return new Promise((resolve, reject) => {
    ConnectionAPI.senderRequest(request, 'GET')
      .then((data: any) => {
        resolve(data.path_from_root);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

function getProductResponseFormatted(
  data: any,
  amountResultMax: number,
  currencyList: Array<any>,
  categoryList?: Array<any>
) {
  let listItems: Array<ItemList> = [];

  if (data.results && data.results.length) {
    amountResultMax = amountResultMax ? amountResultMax : data.results.length;
    for (let i = 0; i < amountResultMax; i++) {
      let currency: any = currencyList.find((currency: any) => {
        return currency.id == data.results[i].currency_id;
      });
      let amountDecimals: number = currency ? currency.decimal_places : 0;
      let symbol: string = currency ? currency.symbol : '';
      listItems.push(
        new ItemList(
          data.results[i].id,
          data.results[i].title,
          new Price(data.results[i].price, symbol, amountDecimals),
          data.results[i].thumbnail,
          data.results[i].condition,
          data.results[i].shipping.free_shipping,
          data.results[i].address.state_name
        )
      );
    }
  }

  return new ItemResponse(author, categoryList, listItems);
}

export { items as default };
