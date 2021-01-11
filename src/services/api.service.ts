import RequestPromise from 'request-promise';
import * as dotenv from 'dotenv';

dotenv.config();

const apiBase = process.env.apiBase;

const connectionApi = {
  senderRequest,
};

function formatParams(params: any[]): string {
  let paramsFormatted = '';
  const index = 0;

  for (const property in params) {
    paramsFormatted += index == 0 ? '' : '&';
    paramsFormatted += property + '=' + params[property];
  }

  return paramsFormatted;
}

function getContextApi(config: any, method: string): any {
  const options = {
    uri: apiBase,
    method: method,
  };

  switch (config.type) {
    case 'query':
      options.uri += config.method + '?' + formatParams(config.params);
      break;
    case 'url':
      options.uri += config.method + '/' + config.params;
      break;
    default:
      options.uri += config.method;
      break;
  }

  return options;
}

function senderRequest(options: any, method: string) {
  let optionsRequest = getContextApi(options, method);

  return new Promise((resolve, reject) => {
    RequestPromise(optionsRequest)
      .then((data: any) => {
        if (data) {
          resolve(JSON.parse(data));
        }
        reject('Ocurrio un error al procesar los datos');
      })
      .catch((error: any) => {
        reject('Ocurrio un error al obtener los datos');
      });
  });
}

export { connectionApi as default };
