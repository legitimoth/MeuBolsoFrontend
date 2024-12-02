import { CanActivateFn } from '@angular/router';
import {tap} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);

  return auth.isAuthenticated$.pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        auth.loginWithRedirect({
          appState: { target: state.url }, // Salva a URL original para redirecionar após login
        });
      }
    })
  );
};
