// EMA y RSI genéricos

export function calcEMA(prices, period) {
  const k = 2 / (period + 1);
  return prices.reduce(
    (prevEma, price, i) => (i === 0 ? price : price * k + prevEma * (1 - k)),
    prices[0]
  );
}

export function calcRSI(prices) {
  let gains = 0, losses = 0;
  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff > 0) gains += diff;
    else losses -= diff;
  }
  const avgGain = gains / (prices.length - 1);
  const avgLoss = (losses / (prices.length - 1)) || 1e-6;
  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}

// Extrae low/high del domingo de un array de kline completo
export function getSundayRange(klineArray) {
  const sunday = klineArray
    .filter(c => {
      const d = new Date(c[0]);
      return d.getUTCDay() === 0;
    })
    .slice(-1)[0];
  if (!sunday) return {};
  return {
    sundayMin: Number(sunday[3]),
    sundayMax: Number(sunday[2])
  };
}
