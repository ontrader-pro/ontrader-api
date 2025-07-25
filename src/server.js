import app from './app.js';
import { PORT, TOP15_CRON } from './config/index.js';
import cron from 'node-cron';
import { fetchTop15 } from './services/binanceService.js';
import { updateTop15Cache } from './controllers/indexController.js';

app.listen(PORT, () =>
  console.log(`🚀 ontrader-api escuchando en puerto ${PORT}`)
);

cron.schedule(TOP15_CRON, async () => {
  try {
    const nuevoTop = await fetchTop15();
    updateTop15Cache(nuevoTop);
    console.log('🔄 Top15 cache actualizado:', nuevoTop);
  } catch (e) {
    console.error('Error actualizando top15:', e);
  }
});
