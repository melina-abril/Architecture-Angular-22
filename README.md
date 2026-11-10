# Arquitectura Angular 22 de Speed

Base para el frontend de cada cliente: Angular 22 standalone, zoneless y con signals. Ya trae el inicio de sesión,
el layout, el manejo de errores HTTP y los componentes comunes. Cada cliente solo agrega sus módulos.

## Ramas

- `main`: solo los archivos **fijos**. Es lo que "Generar código" de Speed copia tal cual al repo del cliente. No
  agregues ahí archivos que genera cada sistema (`app.routes.ts`, `app.navigation.ts`, `theme.scss`, `README.md`):
  Speed los tomaría como fijos y no los generaría.
- `starter`: `main` + esos archivos en versión mínima (una pantalla de inicio), para empezar un cliente a mano.

## Cómo levantarla

```bash
npm install
npm start                # con mocks, sin backend: cualquier correo y la contraseña Demo1234!
npm run start:backend    # contra el backend local: proxy.conf.json manda /api a http://localhost:8080
npm run build            # lo que se despliega: SIEMPRE contra el backend (environment.production.ts)
```

El build de producción llama a la API en el **mismo origen** bajo `/api` (proxy reverso del hosting). La sesión es
una cookie HttpOnly + SameSite=Lax: si la API queda en otro dominio, la cookie no viaja.

## Qué ya está resuelto (no lo reescribas)

- `core/session`: sesión completa. `CurrentUser` (usuario, `hasRole`, login, logout), `LoginPage` en `/login`,
  `authGuard` / `guestGuard`, `roleGuard(...roles)` y `sessionExpiredInterceptor` (un 401 vuelve al login).
  Todo lo que declares en `app.routes.ts` ya pide sesión: lo envuelve `withSession`.
- `core/http`: `apiUrl(path)`, `ApiProblemError` + `errorMessage(error)`, `mockResponse` / `mockError`.
- `core/layout`: encabezado y navegación lateral (se arman con `app.navigation.ts`).
- `shared`: `PageHeader`, `LoadingState`, `EmptyState`, `ErrorAlert`, `StatusBadge`, `ConfirmDialog`,
  `LoadState<T>` + `toLoadState`, `Page<T>`, `ProblemDetail` y el pipe `money`.

Contrato con el backend: `POST /api/auth/login { email, password }` → `{ id, name, email, role }` + cookie,
`POST /api/auth/logout` → 204, `GET /api/auth/me` → usuario o 401. Errores como ProblemDetail
`{ title, status, detail, code?, errors? }`. Los backends de Speed (Spring Boot 4 y Node.js 24) ya lo cumplen.

## Lo que define cada sistema

- `src/app/app.navigation.ts`: `APP_TITLE`, `APP_ROLES` (mismos códigos que `users.role` del backend) y
  `APP_NAVIGATION` (un link por módulo).
- `src/app/app.routes.ts`: una ruta lazy por módulo con `loadChildren`.
- `src/theme.scss`: las variables de color, tipografía y espaciado de la guía de estilos.

## Cómo agregar un módulo

```
src/app/features/{modulo}/
  {modulo}.routes.ts        export const {MODULO}_ROUTES: Routes (una página por ruta con loadComponent)
  models/                   interfaces con los mismos campos que los DTOs del backend
  data-access/              {modulo}.service.ts (mock si environment.useMock, si no HttpClient) + {modulo}.mock.ts
  pages/{pagina}/           {pagina}.ts + .html + .scss
  components/               componentes chicos con input() / output()
```

Después, regístralo en `app.routes.ts` y en `app.navigation.ts`. El módulo `products` del kit de Speed es el ejemplo
completo (listado con filtros y paginado, detalle, alta/edición y baja con confirmación).
