import { SearchIcon } from './icons.jsx';
import styles from './StatePanel.module.css';

// Se muestra cuando una búsqueda/filtro no arroja resultados.
export function EmptyState({
  title = 'Sin resultados',
  message = 'No encontramos servicios que coincidan con los filtros aplicados.',
  onClear,
}) {
  return (
    <div className={styles.wrap}>
      <span className={styles.icon}>
        <SearchIcon />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onClear && (
        <button className="btn btn--ghost" onClick={onClear}>
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
