import axios from 'axios';

// 1) Top 15 por volumen 24h en futuros USDT
export async function fetchTop15() {
  const { data } = await axios.get('https://fapi.binance.com/fapi/v1/ticker/24hr');
  return data
    .filter(t => t.symbol.endsWith('USDT'))
    .map(t => ({ symbol: t.symbol, volume: +t.quoteVolume }))
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 15)
    .map(x => x.symbol);
}

// 2) Klines de Binance (cierre) para un símbolo/intervalo
export async function fetchKlines(symbol, interval, limit) {
  const url = `https://fapi.binance.com/fapi/v1/klines` +
              `?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const { data } = await axios.get(url);
  return data; // array completo: [ [openTime, open, high, low, close, ...], ... ]
}

// 3) Precio actual
export async function fetchPrice(symbol) {
  const { data } = await axios.get(
    `https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbol}`
  );
  return +data.price;
}
