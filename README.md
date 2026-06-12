# 🚚 Logistics Monitor

Aplicación web para el seguimiento de **servicios logísticos**: dashboard con
indicadores, listado con filtros y búsqueda, detalle de cada servicio y diseño
responsive con modo claro/oscuro. El frontend consume una API propia construida
con Node + Express.

> Prueba técnica — enfoque en frontend (diseño, UX, componentes) con un backend
> sencillo que expone los datos vía API.

---

## 🔗 Enlaces

| Recurso | URL |
| --- | --- |
| Aplicación (frontend) | _completar tras desplegar_ |
| API (backend) | _completar tras desplegar_ |
| Repositorio | _completar_ |

---

## 🧱 Stack tecnológico

- **Frontend:** React 18 + Vite, CSS Modules con sistema de tokens (variables CSS), sin librerías de UI.
- **Backend:** Node.js + Express (ESM), datos en memoria (sin base de datos).
- **Despliegue:** Render (Web Service para la API + Static Site para el frontend).

---

## 📁 Estructura del proyecto

```
Cris_Prueba/
├── backend/                 # API REST (Node + Express)
│   ├── src/
│   │   ├── server.js        # Punto de entrada
│   │   ├── app.js           # Configuración de Express (middlewares, rutas)
│   │   ├── config/          # Configuración (puerto, CORS)
│   │   ├── data/            # Datos en memoria (32 servicios)
│   │   ├── repositories/    # Lógica de consulta (filtros, búsqueda, paginación, stats)
│   │   ├── controllers/     # Manejo de peticiones/respuestas
│   │   ├── routes/          # Definición de rutas
│   │   └── middlewares/     # Manejo de errores y 404
│   └── package.json
│
├── frontend/                # Aplicación React (Vite)
│   ├── src/
│   │   ├── api/             # Cliente HTTP (fetch + manejo de errores)
│   │   ├── components/      # Componentes (layout, dashboard, services, ui)
│   │   ├── context/         # ThemeContext (modo claro/oscuro)
│   │   ├── hooks/           # useFetch, useServices, useDebounce, useMediaQuery…
│   │   ├── styles/          # Sistema de diseño (tokens, temas) y layout
│   │   └── utils/           # Utilidades (formato de fechas)
│   └── package.json
│
├── render.yaml              # Blueprint de despliegue en Render
└── README.md
```

---

## ✅ Requisitos previos

- **Node.js 18 o superior** (probado con Node 24) y **npm**.

Verifícalo con:

```bash
node --version
npm --version
```

---

## ▶️ Ejecución local

El proyecto son **dos aplicaciones independientes**. Hay que levantar las dos
(en dos terminales).

### 1) Backend (API)

```bash
cd backend
npm install
npm run dev      # modo desarrollo (recarga automática)  ·  o:  npm start
```

La API queda disponible en **http://localhost:4000**.
Pruébala abriendo http://localhost:4000/api/services.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

La app queda disponible en **http://localhost:5173** (Vite la abre en el navegador).

> El frontend usa por defecto `http://localhost:4000` como URL de la API, así que
> no necesitas configurar nada para desarrollo local. Si quieres cambiarla, copia
> `frontend/.env.example` a `frontend/.env` y ajusta `VITE_API_URL`.

---

## 🔧 Variables de entorno

### Backend (`backend/.env`, opcional)

| Variable | Por defecto | Descripción |
| --- | --- | --- |
| `PORT` | `4000` | Puerto de la API (Render lo asigna automáticamente). |
| `CORS_ORIGIN` | `*` | Orígenes permitidos (separados por comas). `*` permite cualquiera. |

### Frontend (`frontend/.env`, opcional)

| Variable | Por defecto | Descripción |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:4000` | URL base de la API que consume el frontend. |

---

## 🌐 API — Endpoints

Base: `/api`

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/health` | Estado del servicio. |
| `GET` | `/api/services` | Lista de servicios (soporta filtros, búsqueda y paginación). |
| `GET` | `/api/services/:id` | Detalle de un servicio (404 si no existe). |
| `GET` | `/api/services/stats` | Indicadores del dashboard (total, activos, en alarma, finalizados…). |
| `GET` | `/api/services/filters` | Valores únicos para poblar los filtros (clientes, estados, niveles). |

### Parámetros de `/api/services`

| Parámetro | Ejemplo | Descripción |
| --- | --- | --- |
| `estado` | `?estado=Activo` | Filtra por estado. |
| `cliente` | `?cliente=Nestlé` | Filtra por cliente. |
| `nivelAlarma` | `?nivelAlarma=Alta` | Filtra por nivel de alarma. |
| `q` | `?q=perez` | Búsqueda general (placa, conductor, origen, destino). Ignora acentos. |
| `page` | `?page=2` | Página actual. |
| `limit` | `?limit=8` | Resultados por página. |

**Respuesta de ejemplo** (`GET /api/services?estado=Activo&limit=2`):

```json
{
  "data": [
    {
      "id": 1,
      "cliente": "Protekto",
      "origen": "Buenaventura",
      "destino": "Bogotá",
      "estado": "Activo",
      "fechaInicio": "2026-06-10",
      "placa": "WXK482",
      "conductor": "Carlos Pérez",
      "nivelAlarma": "Normal",
      "observacion": "Servicio activo sin novedades reportadas."
    }
  ],
  "pagination": { "page": 1, "limit": 2, "total": 12, "totalPages": 6 }
}
```

---

## 🧩 Funcionalidades

**Frontend**
- [x] Dashboard con indicadores calculados desde la API (total, activos, en alarma, finalizados).
- [x] Listado de servicios (tabla en escritorio, tarjetas en celular).
- [x] Filtros por estado, cliente y nivel de alarma.
- [x] Búsqueda general (placa, conductor, origen, destino) con _debounce_.
- [x] Detalle del servicio en panel lateral (consume `/api/services/:id`).
- [x] Diseño responsive (escritorio y celular).
- [x] Estados de UI: cargando, sin resultados y error de API (con reintento).

**Backend**
- [x] `GET /api/services` y `GET /api/services/:id`.
- [x] Filtros por query, búsqueda y paginación.
- [x] Endpoints adicionales de stats y filtros.
- [x] Manejo centralizado de errores y CORS.

**Puntos adicionales**
- [x] Paginación · [x] Modo oscuro · [x] Gráficos · [x] Manejo de errores robusto.

---

## ☁️ Despliegue en Render

Todo el proyecto se despliega en **Render** (plan gratuito): la API como
*Web Service* y el frontend como *Static Site*.

> ⚠️ En el plan gratuito, el Web Service "se duerme" tras ~15 min de inactividad.
> La **primera** petición puede tardar 30–50 s en responder mientras "despierta".

### Opción A — Manual (recomendada, paso a paso)

**1. Backend (Web Service)**
1. New > **Web Service** > conecta el repositorio.
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Crea el servicio y copia su URL (p. ej. `https://logistics-monitor-api.onrender.com`).

**2. Frontend (Static Site)**
1. New > **Static Site** > mismo repositorio.
2. **Root Directory:** `frontend`
3. **Build Command:** `npm install && npm run build`
4. **Publish Directory:** `dist`
5. **Environment Variable:** `VITE_API_URL` = la URL del backend del paso anterior.
6. Añade una **Redirect/Rewrite Rule** para el routing de SPA:
   `Source: /*` → `Destination: /index.html` (Action: Rewrite).

### Opción B — Blueprint (`render.yaml`)

1. New > **Blueprint** > selecciona el repositorio (Render detecta `render.yaml`).
2. Crea ambos servicios automáticamente.
3. Configura `VITE_API_URL` en el frontend con la URL de la API y redepliega.

---

## 💡 Decisiones técnicas

- **Separación frontend/backend** en carpetas independientes, cada una con su `package.json`.
- **Backend por capas** (rutas → controladores → repositorio → datos): si se migrara a una base de datos, solo cambiaría el repositorio.
- **Indicadores desde la API** (`/api/services/stats`): una sola fuente de verdad, sin recalcular en el cliente ni "quemar" datos en la interfaz.
- **CSS Modules + tokens**: sistema de diseño consistente (colores, espaciado, tipografía) y modo oscuro mediante variables CSS, sin dependencias de UI.
- **Hooks reutilizables** (`useFetch`, `useServices`, `useDebounce`, `useMediaQuery`) que encapsulan la lógica de datos y de UI.
- **Estados de UI explícitos**: carga, vacío y error, tal como se espera de una app real.
