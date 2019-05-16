const $ = document.querySelector.bind(document);
const cryptoCurrencies = [
  'BTC',
  'ETH',
  'XRP'
];

const fiatCurrencies = [
  'USD',
  'EUR',
  'GBP',
];

const getSelectedValue = node => node.options[node.selectedIndex].value;

const apiUrl = 'https://min-api.cryptocompare.com/data/price';
const apiKey = '6c577389c0d49adb57faf353a56a646a0336d782883d0a81f6a9e38608ef1d09';

const apiRequest = queryString => fetch(`${apiUrl}${queryString}`, {
  headers: {
    authorization: apiKey
  }
}).then(r => r.json())

const buildApiQueryString = (crypto, fiat) =>
  `?fsym=${crypto}&tsyms=${fiat}`

const arrayToOptions = (a) => a.reduce(
  (result, currency) => `${result}<option value="${currency}">${currency}</option>`,
  ''
);

const requestTriggered = ({
  amountInput,
  fiatSelect,
  cryptoSelect,
  resultInput,
}) => () => apiRequest(
  buildApiQueryString(getSelectedValue(cryptoSelect), getSelectedValue(fiatSelect))
).then(r => {
  const result = (r[getSelectedValue(fiatSelect)] * amountInput.value).toFixed(2);
  resultInput.value = result;
})

const initApp = () => {
  const elems = {
    cryptoSelect: $('#cryptoSelect'),
    fiatSelect: $('#fiatSelect'),
    amountInput: $('#amount'),
    resultInput: $('#result'),
  };

  elems.cryptoSelect.innerHTML = arrayToOptions(cryptoCurrencies);
  elems.fiatSelect.innerHTML = arrayToOptions(fiatCurrencies);

  const onRequestTriggered = requestTriggered(elems);
  elems.amountInput.addEventListener('keyup', onRequestTriggered);
  elems.fiatSelect.addEventListener('change', onRequestTriggered);
  elems.cryptoSelect.addEventListener('change', onRequestTriggered);
};

document.addEventListener('DOMContentLoaded', initApp);
/*
 * Padding because plunkr rditor cuts off last line
*/

