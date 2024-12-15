import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import {combineLatest, filter, switchMap } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return combineLatest([authService.ready$, authService.token$]).pipe(
    filter(([isReady, token]) => (isReady || req.url.includes('usuarios')) && !!token),
    switchMap(([_, token]) => {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      return next(cloned);
    })
  );
};
