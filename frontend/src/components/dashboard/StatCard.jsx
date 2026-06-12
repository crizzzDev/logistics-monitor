import styles from './StatCard.module.css';

// Tarjeta de un indicador del dashboard: icono + valor + etiqueta.
export function StatCard({ icon, label, value, variant }) {
  return (
    <article className={`card ${styles.card}`}>
      <span className={`${styles.icon} ${styles[variant]}`}>{icon}</span>
      <div className={styles.body}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </article>
  );
}
