import {
  PackageIcon,
  TruckIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
} from '../ui/icons.jsx';
import { StatCard } from './StatCard.jsx';
import styles from './StatsCards.module.css';

// Cuadrícula con los cuatro indicadores principales requeridos por la prueba.
export function StatsCards({ stats }) {
  const cards = [
    { key: 'total', label: 'Total de servicios', value: stats.total, variant: 'total', icon: <PackageIcon /> },
    { key: 'activos', label: 'Servicios activos', value: stats.activos, variant: 'activo', icon: <TruckIcon /> },
    { key: 'alarma', label: 'En alarma', value: stats.enAlarma, variant: 'alarma', icon: <AlertTriangleIcon /> },
    { key: 'finalizados', label: 'Finalizados', value: stats.finalizados, variant: 'finalizado', icon: <CheckCircleIcon /> },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <StatCard
          key={card.key}
          icon={card.icon}
          label={card.label}
          value={card.value}
          variant={card.variant}
        />
      ))}
    </div>
  );
}
