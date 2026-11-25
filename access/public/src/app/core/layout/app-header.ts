import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_TITLE } from '../../app.navigation';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="site-header">
      <div class="site-header__inner">
        <strong class="site-header__title">{{ title }}</strong>
      </div>
    </header>
  `,
  styles: `
    .site-header { background: var(--color-primary); color: var(--color-on-primary); }
    .site-header__inner { max-width: 100rem; margin: auto; padding: var(--space-md) var(--space-lg); display: flex; align-items: center; flex-wrap: wrap; gap: var(--space-md); }
    .site-header__title { font-size: 1.2rem; margin-right: auto; }
    @media (max-width: 600px) { .site-header__inner { padding: var(--space-md); } }
  `,
})
/** Encabezado sin inicio de sesión: solo el nombre del sistema (no hay usuario, rol ni cerrar sesión). */
export class AppHeader {
  protected readonly title = APP_TITLE;
}
