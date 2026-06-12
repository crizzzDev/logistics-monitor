import styles from './Badge.module.css';

// Badges de color para estado y nivel de alarma.
// El color comunica el estado de un vistazo (jerarquía visual).

const STATUS_CLASS = {
  Activo: styles.activo,
  Finalizado: styles.finalizado,
  'En alarma': styles.alarma,
  Pendiente: styles.pendiente,
};

export function StatusBadge({ estado }) {
  return <span className={`badge ${STATUS_CLASS[estado] || ''}`}>{estado}</span>;
}

const ALARM_CLASS = {
  Normal: styles.normal,
  Media: styles.media,
  Alta: styles.alta,
};

export function AlarmBadge({ nivel }) {
  return <span className={`badge ${ALARM_CLASS[nivel] || ''}`}>{nivel}</span>;
}
