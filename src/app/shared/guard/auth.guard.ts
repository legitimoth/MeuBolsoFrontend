import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {filter, firstValueFrom, switchMap, take} from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  const isAuthenticated = await firstValueFrom(
    authService.ready$.pipe(
      filter((isReady) => isReady),
      switchMap(() => authService.isAuthenticated$),
      take(1),
    )
  );

  if (!isAuthenticated) {
    authService.login();
    return false;
  }

  return true;
};
