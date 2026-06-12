import { useFetch } from './useFetch.js';
import { getServices } from '../api/services.js';

// Carga el listado de servicios aplicando filtros, búsqueda y paginación.
// Vuelve a pedir datos automáticamente cuando cambia cualquier parámetro.
export function useServices({ estado, cliente, nivelAlarma, q, page, limit }) {
  const { data, loading, error, reload } = useFetch(
    () => getServices({ estado, cliente, nivelAlarma, q, page, limit }),
    [estado, cliente, nivelAlarma, q, page, limit],
  );

  return {
    services: data?.data ?? [],
    pagination: data?.pagination ?? null,
    loading,
    error,
    reload,
  };
}
