// Configuración de la aplicación Express: middlewares, rutas y manejo de errores.
// Se separa de server.js para mantener la creación de la app aislada del arranque.

import express from 'express';
import cors from 'cors';

import { config } from './config/env.js';
import servicesRoutes from './routes/services.routes.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';

export function createApp() {
  const app = express();

  // CORS: permite '*' (cualquier origen) o una lista blanca definida en CORS_ORIGIN.
  app.use(
    cors({
      origin(origin, callback) {
        const allowed = config.corsOrigins;
        if (allowed.includes('*') || !origin || allowed.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error(`Origen no permitido por CORS: ${origin}`));
      },
    }),
  );

  app.use(express.json());

  // Healthcheck: útil para verificar que el servicio está vivo (Render, monitoreo).
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'logistics-monitor-api' });
  });

  // Mensaje raíz para no devolver un 404 seco al entrar a la URL base.
  app.get('/', (_req, res) => {
    res.json({
      message: 'Logistics Monitor API',
      endpoints: [
        'GET /api/health',
        'GET /api/services',
        'GET /api/services/stats',
        'GET /api/services/filters',
        'GET /api/services/:id',
      ],
    });
  });

  app.use('/api/services', servicesRoutes);

  // Manejo de rutas no encontradas y errores (siempre al final).
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
