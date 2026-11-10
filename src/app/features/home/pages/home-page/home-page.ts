import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrentUser } from '../../../../core/session/current-user';
import { PageHeader } from '../../../../shared/components/page-header';

/** Pantalla de inicio de ejemplo: reemplázala por el primer módulo del sistema. */
@Component({
  selector: 'app-home-page',
  imports: [PageHeader],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly currentUser = inject(CurrentUser);
}
