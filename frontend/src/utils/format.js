// Formatea una fecha ISO (YYYY-MM-DD) a un formato legible en español.
// Se construye con componentes locales para evitar el desfase de zona horaria
// que ocurre al parsear directamente con new Date('YYYY-MM-DD').
export function formatDate(iso) {
  if (!iso) return '—';
  const [year, month, day] = iso.split('-').map(Number);
  const date = new Date(year, (month || 1) - 1, day || 1);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
