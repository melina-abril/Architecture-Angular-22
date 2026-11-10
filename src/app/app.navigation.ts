import { AppRole, NavigationItem } from './core/layout/navigation.model';

/** Nombre del sistema: título de la pestaña, del encabezado y del login. */
export const APP_TITLE = 'Mi sistema';

/**
 * Roles del sistema, con los MISMOS códigos que users.role del backend. El primero es el usuario con el que
 * arranca el modo mock. Sin roles: [].
 */
export const APP_ROLES: readonly AppRole[] = [{ value: 'ADMIN', label: 'Administrador', userName: 'Usuario de prueba' }];

/** Un link por módulo, en el mismo orden que app.routes.ts. roles: quién lo ve (sin roles, todos). */
export const APP_NAVIGATION: readonly NavigationItem[] = [{ path: 'home', label: 'Inicio' }];
