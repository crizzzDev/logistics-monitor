import { useFetch } from './useFetch.js';
import { getStats } from '../api/services.js';

// Carga los indicadores globales del dashboard desde la API.
export function useStats() {
  const { data, loading, error, reload } = useFetch(() => getStats(), []);
  return { stats: data, loading, error, reload };
}
