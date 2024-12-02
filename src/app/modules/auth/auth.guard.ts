import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {tap} from 'rxjs';
import {AuthService} from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);

  return auth.isAuthenticated.pipe(
    tap(async isAuthenticated => {
      if (!isAuthenticated) {
        auth.login();
      }
      await auth.checkAndUpdateUser()
    })
  );
};
