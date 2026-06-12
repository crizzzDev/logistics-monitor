// Capa de acceso a datos: encapsula toda la lógica de consulta sobre los servicios.
// Si en el futuro se migra a una base de datos, solo cambiaría este archivo.

import { services } from '../data/services.js';

// Normaliza texto para comparaciones (sin distinción de mayúsculas/acentos).
// ̀-ͯ es el rango Unicode de marcas diacríticas combinantes (acentos).
const normalize = (value = '') =>
  value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/**
 * Devuelve los servicios aplicando filtros, búsqueda y paginación.
 * @param {object} options
 * @param {string} [options.estado]
 * @param {string} [options.cliente]
 * @param {string} [options.nivelAlarma]
 * @param {string} [options.q] - búsqueda general (placa, conductor, origen, destino)
 * @param {number} [options.page]
 * @param {number} [options.limit]
 */
export function findServices({ estado, cliente, nivelAlarma, q, page, limit } = {}) {
  let result = [...services];

  if (estado) {
    result = result.filter((s) => normalize(s.estado) === normalize(estado));
  }

  if (cliente) {
    result = result.filter((s) => normalize(s.cliente) === normalize(cliente));
  }

  if (nivelAlarma) {
    result = result.filter((s) => normalize(s.nivelAlarma) === normalize(nivelAlarma));
  }

  if (q) {
    const term = normalize(q);
    result = result.filter((s) =>
      [s.placa, s.conductor, s.origen, s.destino].some((field) =>
        normalize(field).includes(term),
      ),
    );
  }

  const total = result.length;

  // Paginación: solo se aplica si llega un limit válido. Si no, se devuelven todos.
  const parsedLimit = Number(limit);
  const hasPagination = Number.isInteger(parsedLimit) && parsedLimit > 0;
  const currentLimit = hasPagination ? parsedLimit : total;
  const currentPage = Math.max(1, Number(page) || 1);
  const totalPages = currentLimit > 0 ? Math.ceil(total / currentLimit) : 1;

  const start = (currentPage - 1) * currentLimit;
  const data = hasPagination ? result.slice(start, start + currentLimit) : result;

  return {
    data,
    pagination: {
      page: currentPage,
      limit: currentLimit,
      total,
      totalPages,
    },
  };
}

/** Devuelve un servicio por id, o undefined si no existe. */
export function findServiceById(id) {
  return services.find((s) => s.id === Number(id));
}

/** Calcula los indicadores globales del dashboard a partir de los datos. */
export function getStats() {
  const porEstado = {};
  const porNivelAlarma = {};

  for (const s of services) {
    porEstado[s.estado] = (porEstado[s.estado] || 0) + 1;
    porNivelAlarma[s.nivelAlarma] = (porNivelAlarma[s.nivelAlarma] || 0) + 1;
  }

  return {
    total: services.length,
    activos: porEstado['Activo'] || 0,
    enAlarma: porEstado['En alarma'] || 0,
    finalizados: porEstado['Finalizado'] || 0,
    pendientes: porEstado['Pendiente'] || 0,
    porEstado,
    porNivelAlarma,
  };
}

/** Devuelve los valores únicos disponibles para poblar los filtros del frontend. */
export function getFilterOptions() {
  const unique = (key) => [...new Set(services.map((s) => s[key]))].sort();
  return {
    clientes: unique('cliente'),
    estados: unique('estado'),
    nivelesAlarma: unique('nivelAlarma'),
  };
}
