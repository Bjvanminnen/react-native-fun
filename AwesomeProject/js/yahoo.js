import _ from 'lodash';

/**
 * @param {string|string[]} symbols
 * @returns {Promise}
 */
export default function getCurrentPrices(symbols) {
  if (typeof symbols === "string") {
    symbols = [symbols];
  }

  const url = `http://finance.yahoo.com/webservice/v1/symbols/${symbols}/quote?format=json`;
  return fetch(url)
  .then(response => response.json())
  .then(result => {
    const symbolValuePairs = result.list.resources.map(resource => {
      const { symbol, price } = resource.resource.fields;
      return [symbol, parseFloat(price)];
    });
    return _.fromPairs(symbolValuePairs);
  });
}
