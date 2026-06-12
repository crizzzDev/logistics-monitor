// Controladores: reciben la petición HTTP, delegan en el repositorio y arman la respuesta.
// No contienen lógica de datos; eso vive en services.repository.js.

import {
  findServices,
  findServiceById,
  getStats,
  getFilterOptions,
} from '../repositories/services.repository.js';

// GET /api/services
export function listServices(req, res) {
  const { estado, cliente, nivelAlarma, q, page, limit } = req.query;
  const result = findServices({ estado, cliente, nivelAlarma, q, page, limit });
  res.json(result);
}

// GET /api/services/stats
export function serviceStats(_req, res) {
  res.json(getStats());
}

// GET /api/services/filters
export function serviceFilters(_req, res) {
  res.json(getFilterOptions());
}

// GET /api/services/:id
export function getService(req, res) {
  const service = findServiceById(req.params.id);

  if (!service) {
    return res.status(404).json({
      error: {
        status: 404,
        message: `No se encontró el servicio con id ${req.params.id}.`,
      },
    });
  }

  res.json(service);
}
