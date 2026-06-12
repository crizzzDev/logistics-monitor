import styles from './Loader.module.css';

// Indicador de carga accesible (anuncia el estado a lectores de pantalla).
export function Loader({ message = 'Cargando…' }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.text}>{message}</p>
    </div>
  );
}
