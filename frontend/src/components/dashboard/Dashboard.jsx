import { ErrorState } from '../ui/ErrorState.jsx';
import { StatsCards } from './StatsCards.jsx';
import { DistributionChart } from './DistributionChart.jsx';
import styles from './Dashboard.module.css';

// Esqueleto de carga para las tarjetas de indicadores.
function StatsSkeleton() {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={`skeleton ${styles.skeletonCard}`} />
      ))}
    </div>
  );
}

// Sección superior: indicadores generales + gráficos de distribución.
export function Dashboard({ stats, loading, error, onRetry }) {
  return (
    <section className={styles.section} aria-label="Resumen general">
      <div className={styles.head}>
        <h2 className={styles.title}>Resumen general</h2>
        <p className={styles.subtitle}>Indicadores calculados desde la API en tiempo real.</p>
      </div>

      {loading && <StatsSkeleton />}

      {!loading && error && <ErrorState message={error.message} onRetry={onRetry} />}

      {!loading && !error && stats && (
        <>
          <StatsCards stats={stats} />
          <div className={styles.charts}>
            <DistributionChart
              title="Distribución por estado"
              total={stats.total}
              data={[
                { label: 'Activo', value: stats.porEstado?.['Activo'] || 0, color: 'var(--c-activo)' },
                { label: 'Finalizado', value: stats.porEstado?.['Finalizado'] || 0, color: 'var(--c-finalizado)' },
                { label: 'En alarma', value: stats.porEstado?.['En alarma'] || 0, color: 'var(--c-alarma)' },
                { label: 'Pendiente', value: stats.porEstado?.['Pendiente'] || 0, color: 'var(--c-pendiente)' },
              ]}
            />
            <DistributionChart
              title="Niveles de alarma"
              total={stats.total}
              data={[
                { label: 'Normal', value: stats.porNivelAlarma?.['Normal'] || 0, color: 'var(--c-normal)' },
                { label: 'Media', value: stats.porNivelAlarma?.['Media'] || 0, color: 'var(--c-media)' },
                { label: 'Alta', value: stats.porNivelAlarma?.['Alta'] || 0, color: 'var(--c-alta)' },
              ]}
            />
          </div>
        </>
      )}
    </section>
  );
}
