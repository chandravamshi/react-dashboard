import numeral from 'numeral';

// ----------------------------------------------------------------------

numeral.register('locale', 'de', {
  delimiters: {
      thousands: '.',
      decimal: ','
  },
  abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
  },
  currency: {
      symbol: '€'
  }
});

numeral.locale('de');

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '0,0 $' : '0,0[.]00 $');
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}
