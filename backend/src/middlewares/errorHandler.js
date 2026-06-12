// Middlewares de manejo de errores y rutas no encontradas.
// Centralizar esto evita repetir try/catch y devuelve respuestas JSON consistentes.

// 404 para cualquier ruta no definida.
export function notFound(req, res) {
  res.status(404).json({
    error: {
      status: 404,
      message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    },
  });
}

// Manejador de errores general. Express lo reconoce por tener 4 argumentos.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  console.error(`[Error ${status}]`, err.message);

  res.status(status).json({
    error: {
      status,
      message: status === 500 ? 'Error interno del servidor.' : err.message,
    },
  });
}
