import { useState } from 'react';

import { useServices } from '../../hooks/useServices.js';
import { useFilterOptions } from '../../hooks/useFilterOptions.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { FilterBar } from './FilterBar.jsx';
import { ServicesTable } from './ServicesTable.jsx';
import { ServiceCard } from './ServiceCard.jsx';
import { Pagination } from './Pagination.jsx';
import { ServiceDetail } from './ServiceDetail.jsx';
import { Loader } from '../ui/Loader.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import styles from './ServicesSection.module.css';

const PAGE_SIZE = 8;
const EMPTY_FILTERS = { estado: '', cliente: '', nivelAlarma: '' };

// Sección principal: filtros + búsqueda + listado (tabla/tarjetas) + paginación + detalle.
// Concentra el estado de la consulta y delega la presentación en componentes hijos.
export function ServicesSection() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  // La búsqueda se "debouncea" para no pedir a la API en cada tecla.
  const search = useDebounce(searchInput, 350);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { options } = useFilterOptions();

  const { services, pagination, loading, error, reload } = useServices({
    ...filters,
    q: search,
    page,
    limit: PAGE_SIZE,
  });

  const hasActiveFilters = Boolean(
    filters.estado || filters.cliente || filters.nivelAlarma || searchInput,
  );

  // Cualquier cambio de filtro o búsqueda vuelve a la primera página.
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleClear = () => {
    setFilters(EMPTY_FILTERS);
    setSearchInput('');
    setPage(1);
  };

  return (
    <section className={styles.section} aria-label="Listado de servicios">
      <div className={styles.head}>
        <h2 className={styles.title}>Servicios logísticos</h2>
        {pagination && !loading && !error && (
          <span className={styles.count}>{pagination.total} resultado(s)</span>
        )}
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        search={searchInput}
        onSearchChange={handleSearchChange}
        options={options}
        onClear={handleClear}
        hasActiveFilters={hasActiveFilters}
      />

      <div className={styles.results}>
        {loading && <Loader message="Cargando servicios…" />}

        {!loading && error && <ErrorState message={error.message} onRetry={reload} />}

        {!loading && !error && services.length === 0 && (
          <EmptyState onClear={hasActiveFilters ? handleClear : undefined} />
        )}

        {!loading && !error && services.length > 0 && (
          <>
            {isMobile ? (
              <div className={styles.cards}>
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onSelect={setSelectedId}
                    selected={selectedId === service.id}
                  />
                ))}
              </div>
            ) : (
              <ServicesTable
                services={services}
                onSelect={setSelectedId}
                selectedId={selectedId}
              />
            )}
            <Pagination pagination={pagination} onPageChange={setPage} />
          </>
        )}
      </div>

      {selectedId != null && (
        <ServiceDetail serviceId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </section>
  );
}
