import { ChevronLeftIcon, ChevronRightIcon } from '../ui/icons.jsx';
import styles from './Pagination.module.css';

// Controles de paginación. Muestra el rango visible y permite avanzar/retroceder.
export function Pagination({ pagination, onPageChange }) {
  if (!pagination) return null;

  const { page, totalPages, total, limit } = pagination;
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className={styles.wrap}>
      <span className={styles.info}>
        Mostrando <strong>{from}</strong>–<strong>{to}</strong> de <strong>{total}</strong>
      </span>

      {totalPages > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeftIcon />
            Anterior
          </button>
          <span className={styles.pages}>
            Página {page} de {totalPages}
          </span>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Siguiente
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  );
}
