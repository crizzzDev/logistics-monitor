import { useCallback, useEffect, useState } from 'react';

// Hook genérico para consumir la API con manejo de estados de carga y error.
// - `fetcher`: función que devuelve una promesa con los datos.
// - `deps`: dependencias que, al cambiar, disparan una nueva petición.
// - `reload()`: vuelve a ejecutar la petición manualmente (botón "reintentar").
// Evita actualizar el estado si el componente se desmontó (flag `active`).
export function useFetch(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let active = true;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((error) => active && setState({ data: null, loading: false, error }));

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  return { ...state, reload };
}
