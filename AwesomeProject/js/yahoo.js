import _ from 'lodash';

/**
 * @param {string|string[]} symbols
 * @returns {Promise}
 */
export function getCurrentPrices(symbols) {
  if (typeof symbols === "string") {
    symbols = [symbols];
  }

  // http://finance.yahoo.com/d/quotes.csv?s=GE+PTR+MSFT&f=snd1l1yr

  // http://finance.yahoo.com/q/hp?s=WU&a=01&b=19&c=2010&d=01&e=19&f=2010&g=d


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

export function getHistoricalPrices(symbols, date) {
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
      return [
        symbol,
        parseFloat(text.trim().split('\n')[1].split(',')[columns.Close])
      ];
    });
  }))
  .then(result => _.fromPairs(result));
}
