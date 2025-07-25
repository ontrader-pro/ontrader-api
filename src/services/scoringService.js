import { calcEMA, calcRSI } from '../utils/calculators.js';

export function computeScore({
  price, closes6h, closes3h, sundayMin, sundayMax
}) {
  const ema6h = calcEMA(closes6h, 28);
  const rsi6h = calcRSI(closes6h);
  const ema3h = calcEMA(closes3h, 28);
  const rsi3h = calcRSI(closes3h);

  let score = 1;
  if (price > sundayMin) score += 3;
  if (price > sundayMax) score += 2;
  if (rsi6h > 50 && price > ema6h) score += 2;
  if (rsi6h < 50 && price < ema6h) score -= 2;
  if (rsi3h > 70 && price > ema3h) score += 1;
  if (rsi3h < 30 && price < ema3h) score -= 1;
  if (rsi3h < 15) score += 0.5;
  if (rsi3h > 85) score -= 0.5;

  return Math.max(1, Math.min(10, score));
}
