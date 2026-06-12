import { StatusBadge, AlarmBadge } from '../ui/Badge.jsx';
import { formatDate } from '../../utils/format.js';
import styles from './ServicesTable.module.css';

// Vista de tabla (escritorio). Cada fila es seleccionable (click o Enter)
// para abrir el detalle del servicio.
export function ServicesTable({ services, onSelect, selectedId }) {
  return (
    <div className={`card ${styles.wrap}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Ruta</th>
            <th>Estado</th>
            <th>Fecha inicio</th>
            <th>Placa</th>
            <th>Conductor</th>
            <th>Nivel de alarma</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr
              key={service.id}
              className={selectedId === service.id ? styles.selected : undefined}
              onClick={() => onSelect(service.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelect(service.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Ver detalle del servicio de ${service.cliente}`}
            >
              <td className={styles.cliente}>{service.cliente}</td>
              <td>
                <span className={styles.route}>
                  {service.origen} <span className={styles.arrow}>→</span> {service.destino}
                </span>
              </td>
              <td>
                <StatusBadge estado={service.estado} />
              </td>
              <td className={styles.nowrap}>{formatDate(service.fechaInicio)}</td>
              <td>
                <code className={styles.placa}>{service.placa}</code>
              </td>
              <td>{service.conductor}</td>
              <td>
                <AlarmBadge nivel={service.nivelAlarma} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
