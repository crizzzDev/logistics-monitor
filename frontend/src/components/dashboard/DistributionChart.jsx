import styles from './DistributionChart.module.css';

// Gráfico de barras horizontales reutilizable. Recibe una lista de
// { label, value, color } y dibuja barras proporcionales con su porcentaje.
export function DistributionChart({ title, data, total }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <article className={`card ${styles.card}`}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.list}>
        {data.map((item) => {
          const pct = total ? Math.round((item.value / total) * 100) : 0;
          const width = (item.value / max) * 100;
          return (
            <li key={item.label} className={styles.row}>
              <span className={styles.label}>{item.label}</span>
              <div
                className={styles.track}
                role="img"
                aria-label={`${item.label}: ${item.value} servicios (${pct}%)`}
              >
                <div
                  className={styles.fill}
                  style={{ width: `${width}%`, background: item.color }}
                />
              </div>
              <span className={styles.value}>
                {item.value} <small>({pct}%)</small>
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
