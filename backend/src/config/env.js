// Configuración centralizada de la aplicación, leída desde variables de entorno.
// Mantener la lectura de process.env en un solo lugar facilita probar y desplegar.

export const config = {
  // Render asigna el puerto vía la variable PORT; en local usamos 4000 por defecto.
  port: Number(process.env.PORT) || 4000,

  // Lista de orígenes permitidos para CORS. Si no se define, se permite cualquiera ('*'),
  // lo cual es cómodo para la evaluación. En producción conviene restringirlo.
  corsOrigins: (process.env.CORS_ORIGIN || '*')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
