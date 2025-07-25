import {
  fetchTop15,
  fetchKlines,
  fetchPrice
} from '../services/binanceService.js';
import { getSundayRange } from '../utils/calculators.js';
import { computeScore } from '../services/scoringService.js';

let cachedTop15 = [];
let lastTop15Update = 0;

export function updateTop15Cache(newTop) {
  cachedTop15 = newTop;
  lastTop15Update = Date.now();
}

export async function getIndexData(req, res) {
  try {
    if (cachedTop15.length === 0) {
      cachedTop15 = await fetchTop15();
      lastTop15Update = Date.now();
    }

    const kDay = await fetchKlines(cachedTop15[0], '1d', 10);
    const { sundayMin, sundayMax } = getSundayRange(kDay);

    const results = [];
    for (const symbol of cachedTop15) {
      try {
        const price    = await fetchPrice(symbol);
        const k6h      = await fetchKlines(symbol, '6h', 28);
        const k3h      = await fetchKlines(symbol, '3h', 28);
        const closes6h = k6h.map(c => +c[4]);
        const closes3h = k3h.map(c => +c[4]);

        const score    = computeScore({ price, closes6h, closes3h, sundayMin, sundayMax });
        results.push({ symbol, price, score: +score.toFixed(2) });
      } catch(e) {
        console.error(`Error en símbolo ${symbol}:`, e.message);
      }
    }

    res.json({ top15UpdatedAt: lastTop15Update, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
