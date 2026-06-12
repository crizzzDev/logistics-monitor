import { useEffect } from 'react';

import { useFetch } from '../../hooks/useFetch.js';
import { getServiceById } from '../../api/services.js';
import { StatusBadge, AlarmBadge } from '../ui/Badge.jsx';
import { Loader } from '../ui/Loader.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import {
  XIcon,
  MapPinIcon,
  UserIcon,
  CalendarIcon,
  TagIcon,
  FileTextIcon,
  AlertTriangleIcon,
} from '../ui/icons.jsx';
import { formatDate } from '../../utils/format.js';
import styles from './ServiceDetail.module.css';

// Panel lateral (drawer) con el detalle de un servicio.
// Consume GET /api/services/:id, por lo que tiene sus propios estados de carga/error.
export function ServiceDetail({ serviceId, onClose }) {
  const { data: service, loading, error, reload } = useFetch(
    () => getServiceById(serviceId),
    [serviceId],
  );

  // Cerrar con Escape y bloquear el scroll del fondo mientras el drawer está abierto.
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Detalle del servicio"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>Detalle del servicio</h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
            <XIcon />
          </button>
        </header>

        <div className={styles.content}>
          {loading && <Loader message="Cargando detalle…" />}
          {!loading && error && <ErrorState message={error.message} onRetry={reload} />}
          {!loading && !error && service && <DetailBody service={service} />}
        </div>
      </aside>
    </div>
  );
}

function DetailBody({ service }) {
  return (
    <div className={styles.body}>
      <div className={styles.hero}>
        <span className={styles.clienteLabel}>Cliente</span>
        <h3 className={styles.cliente}>{service.cliente}</h3>
        <div className={styles.badges}>
          <StatusBadge estado={service.estado} />
          <AlarmBadge nivel={service.nivelAlarma} />
        </div>
      </div>

      {/* Ruta completa: origen → destino */}
      <div className={styles.routeBox}>
        <div className={styles.routePoint}>
          <span className={styles.routeDot} />
          <div>
            <span className={styles.routeLabel}>Origen</span>
            <span className={styles.routeCity}>{service.origen}</span>
          </div>
        </div>
        <div className={styles.routeLine} />
        <div className={styles.routePoint}>
          <MapPinIcon className={styles.routePin} />
          <div>
            <span className={styles.routeLabel}>Destino</span>
            <span className={styles.routeCity}>{service.destino}</span>
          </div>
        </div>
      </div>

      <dl className={styles.fields}>
        <Field icon={<TagIcon />} label="Placa" value={service.placa} mono />
        <Field icon={<UserIcon />} label="Conductor" value={service.conductor} />
        <Field icon={<CalendarIcon />} label="Fecha de inicio" value={formatDate(service.fechaInicio)} />
        <Field icon={<AlertTriangleIcon />} label="Nivel de alarma" value={service.nivelAlarma} />
      </dl>

      <div className={styles.obs}>
        <span className={styles.obsLabel}>
          <FileTextIcon /> Observaciones
        </span>
        <p className={styles.obsText}>{service.observacion || 'Sin observaciones registradas.'}</p>
      </div>

      <div className={styles.idTag}>ID del servicio: #{service.id}</div>
    </div>
  );
}

function Field({ icon, label, value, mono }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldIcon}>{icon}</span>
      <div>
        <dt className={styles.fieldLabel}>{label}</dt>
        <dd className={mono ? styles.fieldValueMono : styles.fieldValue}>{value}</dd>
      </div>
    </div>
  );
}
