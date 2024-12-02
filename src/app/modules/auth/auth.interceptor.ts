import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {AuthService} from './auth.service';
import {switchMap} from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.token.pipe(
    switchMap((token) => {
      if (token) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(cloned);
      }
      return next(req);
    })
  );
};
