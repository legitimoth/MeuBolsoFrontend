import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const isAuthenticated = await firstValueFrom(authService.isAuthenticated$);

  if (!isAuthenticated) {
    authService.login();
    return false;
  }

  return true;
};
