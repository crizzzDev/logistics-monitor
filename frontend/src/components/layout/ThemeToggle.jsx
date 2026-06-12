import { useTheme } from '../../context/ThemeContext.jsx';
import { SunIcon, MoonIcon } from '../ui/icons.jsx';
import styles from './ThemeToggle.module.css';

// Botón para alternar entre modo claro y oscuro.
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
