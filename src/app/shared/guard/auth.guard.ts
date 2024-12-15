import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {filter, firstValueFrom, take} from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  if (!await firstValueFrom(authService.isAuthenticated$)) {
    authService.login();
    return false;
  }

  await firstValueFrom(
    authService.ready$.pipe(
      filter((isReady) => isReady),
      take(1)
    )
  );

  return true;
};
