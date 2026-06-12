import { useFetch } from './useFetch.js';
import { getFilterOptions } from '../api/services.js';

// Carga las opciones disponibles para los filtros (clientes, estados, niveles).
export function useFilterOptions() {
  const { data, loading, error } = useFetch(() => getFilterOptions(), []);
  return {
    options: data ?? { clientes: [], estados: [], nivelesAlarma: [] },
    loading,
    error,
  };
}
