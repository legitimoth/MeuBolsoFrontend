import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth0 } from '@auth0/auth0-angular';
import {authConfig} from './modules/auth/auth.config';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {AuthInterceptor} from './modules/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideAuth0(authConfig),
    provideHttpClient(withInterceptors([AuthInterceptor]))
  ]
};
