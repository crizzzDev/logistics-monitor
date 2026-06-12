import { AlertTriangleIcon } from './icons.jsx';
import styles from './StatePanel.module.css';

// Se muestra cuando falla la consulta a la API. Permite reintentar.
export function ErrorState({
  message = 'Ocurrió un error al consultar la información.',
  onRetry,
}) {
  return (
    <div className={styles.wrap} role="alert">
      <span className={`${styles.icon} ${styles.iconError}`}>
        <AlertTriangleIcon />
      </span>
      <h3 className={styles.title}>Algo salió mal</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className="btn btn--primary" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}
