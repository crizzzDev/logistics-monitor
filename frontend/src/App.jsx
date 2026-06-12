import { Header } from './components/layout/Header.jsx';
import { Dashboard } from './components/dashboard/Dashboard.jsx';
import { ServicesSection } from './components/services/ServicesSection.jsx';
import { useStats } from './hooks/useStats.js';
import './styles/app.css';

export default function App() {
  // Indicadores globales del dashboard (independientes de los filtros del listado).
  const { stats, loading, error, reload } = useStats();

  return (
    <>
      <Header />

      <main className="container app-main">
        <Dashboard stats={stats} loading={loading} error={error} onRetry={reload} />
        <ServicesSection />
      </main>

      <footer className="container app-footer">
        <p>Logistics Monitor · Prueba técnica · Consumiendo datos desde la API</p>
      </footer>
    </>
  );
}
