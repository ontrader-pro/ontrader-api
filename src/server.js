// src/server.js
import app from './app.js';
import { PORT, TOP15_CRON } from './config/index.js';
import cron from 'node-cron';
import { fetchTop15 } from './services/binanceService.js';
import { updateTop15Cache } from './controllers/indexController.js';

// 1) Arranca el servidor HTTP
app.listen(PORT, () => {
  console.log(`🚀 ontrader-api escuchando en puerto ${PORT}`);
});

// 2) Cronjob para recargar el Top 15 cada lunes a medianoche UTC
cron.schedule(TOP15_CRON, async () => {
  try {
    console.log('🔄 Iniciando actualización de Top15...');
    const nuevoTop15 = await fetchTop15();
    updateTop15Cache(nuevoTop15);
    console.log('✅ Top15 cache actualizado:', nuevoTop15);
  } catch (err) {
    console.error('⚠️ Error actualizando Top15:', err);
  }
});
