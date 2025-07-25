# ontrader-api

Backend en Node/Express que:

- Saca el **Top 15** de futuros USDT en Binance (volumen 24h), actualizado cada lunes y congelado 21 días.
- Expone `/api/index-data` con cálculo de **EMA 28** y **RSI** en marcos de **6 h** y **3 h**.
- Hace fetch temporal escalonado para no saturar la API.
- Deploy en Railway: solo `git push`, Railway detecta `npm start`.

## Scripts

- `npm run dev` → arranca con nodemon
- `npm start`   → arranca en producción
