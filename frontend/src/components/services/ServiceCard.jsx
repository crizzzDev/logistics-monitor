import { StatusBadge, AlarmBadge } from '../ui/Badge.jsx';
import { MapPinIcon } from '../ui/icons.jsx';
import { formatDate } from '../../utils/format.js';
import styles from './ServiceCard.module.css';

// Vista de tarjeta (celular). Alternativa táctil y compacta a la tabla.
export function ServiceCard({ service, onSelect, selected }) {
  return (
    <button
      type="button"
      className={`card ${styles.card} ${selected ? styles.selected : ''}`}
      onClick={() => onSelect(service.id)}
      aria-label={`Ver detalle del servicio de ${service.cliente}`}
    >
      <div className={styles.top}>
        <span className={styles.cliente}>{service.cliente}</span>
        <StatusBadge estado={service.estado} />
      </div>

      <div className={styles.route}>
        <MapPinIcon />
        <span>
          {service.origen} → {service.destino}
        </span>
      </div>

      <div className={styles.meta}>
        <code className={styles.placa}>{service.placa}</code>
        <span>{service.conductor}</span>
      </div>

      <div className={styles.bottom}>
        <span className={styles.date}>{formatDate(service.fechaInicio)}</span>
        <AlarmBadge nivel={service.nivelAlarma} />
      </div>
    </button>
  );
}
