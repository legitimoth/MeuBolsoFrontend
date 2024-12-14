import { Injectable } from '@angular/core';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';
import { Observable, firstValueFrom } from 'rxjs';
import { ApiService } from '../service/api-response.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  token$: Observable<string>;
  isAuthenticated$: Observable<boolean>;
  user$: Observable<User | null | undefined>;

  constructor(private auth0Service: Auth0Service, private api: ApiService) {
    this.isAuthenticated$ = this.auth0Service.isAuthenticated$;
    this.user$ = this.auth0Service.user$;
    this.token$ = this.auth0Service.getAccessTokenSilently({ authorizationParams: { audience: 'meu-bolso-api' } });
  }

  login(): void {
    this.auth0Service.loginWithRedirect({
      appState: { target: document.location.origin },
    });
  }

  async logout(): Promise<void> {
    if (await firstValueFrom(this.auth0Service.isAuthenticated$)) {
      this.auth0Service.logout({ logoutParams: { returnTo: document.location.origin } });
    }
  }

  async refreshToken(): Promise<void> {
    await firstValueFrom(
      this.auth0Service.getAccessTokenSilently({
        cacheMode: 'off', // ignora o cache para garantir que o token seja renovado
        authorizationParams: { audience: 'meu-bolso-api' }
      })
    );
  }
}
