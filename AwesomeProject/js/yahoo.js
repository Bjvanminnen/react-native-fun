import _ from 'lodash';

import { daysBefore } from './utils';

const InvalidDate = "InvalidDate";

/*
TODO : WIP for CORS enabled requests
function yql(query) {
  const env = 'http://datatables.org/alltables.env';
  const url = `https://query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(query)}&env=${encodeURIComponent(env)}&format=json`;

  return fetch(url)
  .then(response => response.json())
  .then(obj => console.log(obj.query.results));
}

function yql_current(symbols) {
  const symbolString = symbols.map(s => `"${s}"`).join(',');
  const query = `select Symbol, LastTradePriceOnly, LastTradeDate, LastTradeTime from yahoo.finance.quotes ` +
    `where symbol in (${symbolString})`;
  return yql(query);
}

function test() {
  yql_current(['MSFT', 'AAPL'])
  .then(result => console.log(result))
  .catch(err => console.log('err: ', err));
}
*/

/**
 * @param {string|string[]} symbols
 * @returns {Promise}
 */
export function getCurrentPrices(symbols) {
  if (typeof symbols === "string") {
    symbols = [symbols];
  }

  fetch()
  .then(response => response.text())
  .then(text => {
    const rows = text.trim().split('\n')
    rows.forEach(row => console.log(row.split(',')));
  })
  .catch(err => {
    console.log(err);
  });

  const url = `http://finance.yahoo.com/webservice/v1/symbols/${symbols}/quote?format=json`;
  console.log(url);
  return fetch(url)
  .then(response => response.json())
  .then(result => {
    const symbolValuePairs = result.list.resources.map(resource => {
      const { symbol, price } = resource.resource.fields;
      return [symbol, parseFloat(price)];
    });
    // JavaScriptCore apparently can't handle the +0000
    const utcTime = result.list.resources[0].resource.fields.utctime.split('+')[0];
    return {
      dateString: new Date(utcTime).toString(),
      prices: _.fromPairs(symbolValuePairs)
    };
  });
}


// select * from csv where url="http://ichart.finance.yahoo.com/table.csv?s=MSFT&d=0&e=28&f=2010&g=d&a=3&b=12&c=2009" and columns="Date,Open,High,Low,Close,Volume,AdjClose"

function getHistoricalPricesHelper(symbols, date) {
  const start = {
    month: date.getMonth(),
    day: date.getDate(),
    year: date.getYear() + 1900
  };
  const columns = {
    Date: 0,
    Open: 1,
    High: 2,
    Low: 3,
    Close: 4,
    Volume: 5,
    AdjustedClose: 6
  };

  return Promise.all(symbols.map(symbol => {
    const url = `http://ichart.finance.yahoo.com/table.csv?` +
      `s=${symbol}` +
      `&a=${start.month}&b=${start.day}&c=${start.year}` +
      `&d=${start.month}&e=${start.day}&f=${start.year}` +
      `&g=d&ignore=.csv`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw response.status;
      }
      return response.text();
    })
    .then(text => {
      const rows = text.trim().split('\n');
      if (rows.length < 2) {
        throw InvalidDate;
      }
      return [
        symbol,
        parseFloat(rows[1].split(',')[columns.Close])
      ];
    });
  }))
  .then(result => _.fromPairs(result));
}

// TODO - 1 month ago from 2/16 is failing
export function getHistoricalPrices(symbols, date) {
  return getHistoricalPricesHelper(symbols, date)
  .catch(err => {
    if (err === InvalidDate) {
      return getHistoricalPrices(symbols, daysBefore(date, 1));
    }
    throw err;
  });
}
