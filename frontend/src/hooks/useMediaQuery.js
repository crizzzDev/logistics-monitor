import { useEffect, useState } from 'react';

// Devuelve true/false según una media query, y se actualiza al cambiar el viewport.
// Permite decidir en JS si mostrar la tabla (escritorio) o las tarjetas (celular).
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
