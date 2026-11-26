## Sin inicio de sesión (acceso público)
Este sistema NO tiene inicio de sesión: todas sus pantallas son públicas. Esto le gana a lo que dicen arriba sobre la sesión, el login y los roles.
- No existe src/app/core/session/ (ni CurrentUser, ni authGuard, guestGuard, roleGuard, sessionExpiredInterceptor, withSession, ni la ruta /login). No los importes ni los generes, y no generes login-page.ts.
- app.config.ts (fijo) registra `provideRouter(routes, …)` directo: app.routes.ts tiene todas las rutas del sistema, sin guards. La primera es la ruta por defecto ('' → redirectTo) y es la del módulo con isHome: true si hay uno.
- app.navigation.ts exporta APP_TITLE y APP_NAVIGATION (path y label, sin roles). NO exporta APP_ROLES: el tipo AppRole no existe y NavigationItem no tiene `roles`.
- El layout (app.html, AppHeader, SideNav) se ve siempre: el encabezado no muestra usuario, rol, "Ver como" ni "Cerrar sesión".
- Una funcionalidad de inicio de sesión, registro de usuarios o perfil del MVP no se construye: no hay sesión. Una acción que en otro sistema sería de un rol (ej. editar) se muestra a todos, sin computed de roles ni canMatch.
- El backend tampoco pide sesión: ninguna llamada manda credenciales ni espera un 401.
