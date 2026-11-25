/** Link de la navegación: uno por módulo. Sin inicio de sesión no hay roles: todos ven todos los links. */
export interface NavigationItem {
  /** Ruta del módulo en app.routes.ts, sin barra inicial (ej. 'products'). */
  path: string;
  label: string;
}
