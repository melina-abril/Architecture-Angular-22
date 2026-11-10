import { Routes } from '@angular/router';

/**
 * Rutas del sistema (withSession las pone detrás del login). Una ruta lazy por módulo con loadChildren y la
 * constante que exporta su {modulo}.routes.ts; la primera es la ruta por defecto. Un módulo solo para algunos
 * roles lleva canMatch: [roleGuard('ROL')].
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
