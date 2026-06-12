// Definición de rutas de servicios.
// Importante: las rutas específicas (/stats, /filters) van ANTES de /:id
// para que Express no las interprete como un id.

import { Router } from 'express';
import {
  listServices,
  serviceStats,
  serviceFilters,
  getService,
} from '../controllers/services.controller.js';

const router = Router();

router.get('/', listServices);
router.get('/stats', serviceStats);
router.get('/filters', serviceFilters);
router.get('/:id', getService);

export default router;
