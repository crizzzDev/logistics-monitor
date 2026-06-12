import { SearchIcon } from '../ui/icons.jsx';
import styles from './FilterBar.module.css';

// Barra de filtros y búsqueda general.
// - Búsqueda: placa, conductor, origen o destino (con debounce en el padre).
// - Selects: estado, cliente y nivel de alarma.
export function FilterBar({
  filters,
  onFilterChange,
  search,
  onSearchChange,
  options,
  onClear,
  hasActiveFilters,
}) {
  return (
    <div className={`card ${styles.bar}`}>
      <div className={styles.searchWrap}>
        <SearchIcon className={styles.searchIcon} />
        <input
          type="search"
          className={styles.search}
          placeholder="Buscar por placa, conductor, origen o destino…"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Búsqueda general"
        />
      </div>

      <div className={styles.filters}>
        <select
          className={styles.select}
          value={filters.estado}
          onChange={(event) => onFilterChange('estado', event.target.value)}
          aria-label="Filtrar por estado"
        >
          <option value="">Todos los estados</option>
          {options.estados.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={filters.cliente}
          onChange={(event) => onFilterChange('cliente', event.target.value)}
          aria-label="Filtrar por cliente"
        >
          <option value="">Todos los clientes</option>
          {options.clientes.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={filters.nivelAlarma}
          onChange={(event) => onFilterChange('nivelAlarma', event.target.value)}
          aria-label="Filtrar por nivel de alarma"
        >
          <option value="">Todos los niveles</option>
          {options.nivelesAlarma.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button type="button" className="btn btn--ghost btn--sm" onClick={onClear}>
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
