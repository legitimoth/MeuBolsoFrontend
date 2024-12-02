import { Injectable } from '@angular/core';
import {AuthService as Auth0Service, User} from '@auth0/auth0-angular';
import {ApiService} from '../../shared/service/api-response.service';
import {first, firstValueFrom, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = "usuarios";
  isAuthenticated: Observable<boolean>;
  token: Observable<string>;
  user: Observable<User | null | undefined>;

  constructor(private auth0Service: Auth0Service, private api: ApiService) {
    this.isAuthenticated = auth0Service.isAuthenticated$;
    this.token = auth0Service.getAccessTokenSilently();
    this.user = auth0Service.user$;
  }

  async checkAndUpdateUser(): Promise<void> {
    const user = await firstValueFrom(this.user);
    console.log(user);
    if (user && !user['meuBolsoId']) {
      await this.api.post(this.endpoint, {
        "nome": user.name,
        "sobrenome": user.family_name,
        "email": user.email
      })
    }
  }

  login(): void {
    this.auth0Service.loginWithRedirect({
      appState: { target: document.location.origin },
    });
  }

  logout(): void {
    if (this.isAuthenticated) {
      this.auth0Service.logout({ logoutParams: { returnTo: document.location.origin } })
    }
  }
}
