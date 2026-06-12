// Cliente de la API. Centraliza la URL base, la construcción de query params
// y el manejo de errores (de red y de respuesta) para que los componentes
// solo se preocupen por los datos.

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '');

async function request(path) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`);
  } catch {
    // Falla de red: servidor caído, sin conexión o bloqueo de CORS.
    throw new Error(
      'No se pudo conectar con el servidor. Verifica tu conexión o que la API esté disponible.',
    );
  }

  if (!res.ok) {
    let message = `Error ${res.status} al consultar la API.`;
    try {
      const body = await res.json();
      if (body?.error?.message) message = body.error.message;
    } catch {
      /* respuesta sin cuerpo JSON */
    }
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }

  return res.json();
}

function buildQuery(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      qs.append(key, value);
    }
  });
  const str = qs.toString();
  return str ? `?${str}` : '';
}

export function getServices(params) {
  return request(`/api/services${buildQuery(params)}`);
}

export function getServiceById(id) {
  return request(`/api/services/${id}`);
}

export function getStats() {
  return request('/api/services/stats');
}

export function getFilterOptions() {
  return request('/api/services/filters');
}

export { API_URL };
