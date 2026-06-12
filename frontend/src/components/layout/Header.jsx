import { TruckIcon } from '../ui/icons.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';
import styles from './Header.module.css';

// Encabezado fijo con la marca y el control de tema.
export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            <TruckIcon />
          </span>
          <div>
            <h1 className={styles.title}>Logistics Monitor</h1>
            <p className={styles.subtitle}>Seguimiento de servicios logísticos</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
