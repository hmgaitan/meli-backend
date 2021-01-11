import ConnectionAPI from './api.service';
const currency = {
  getCurrencyList,
  reloadCurrencyList,
};

let currencyList: any = null;

function getCurrencyList() {
  return new Promise(function (resolve, reject) {
    if (currencyList) {
      resolve(currencyList);
    } else {
      let request = {
        method: 'currencies',
        type: 'url',
        params: '',
      };
      ConnectionAPI.senderRequest(request, 'GET')
        .then((data: any) => {
          currencyList = data;
          resolve(currencyList);
        })
        .catch((error: any) => {
          reject('No se puedo obtener la lista de tipo de cambio');
        });
    }
  });
}

function reloadCurrencyList() {
  currencyList = null;
  return new Promise(function (resolve, reject) {
    getCurrencyList()
      .then(() => {
        resolve(true);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

export { currency as default };
