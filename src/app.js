// src/app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes/index.js';

const app = express();
app.use(cors());

// Sirve public/index.html y demás archivos estáticos
app.use(express.static(path.join(process.cwd(), 'public')));

// Monta tus endpoints bajo /api
app.use('/api', routes);

export default app;
