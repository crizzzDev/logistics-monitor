import { useEffect, useState } from 'react';

// Retrasa la propagación de un valor para no disparar una petición por cada
// tecla en la búsqueda. Devuelve el último valor "estable".
export function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
