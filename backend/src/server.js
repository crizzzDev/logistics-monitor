// Punto de entrada: crea la app y la pone a escuchar.

import { createApp } from './app.js';
import { config } from './config/env.js';

const app = createApp();

app.listen(config.port, () => {
  console.log(`🚚 Logistics Monitor API escuchando en http://localhost:${config.port}`);
});
