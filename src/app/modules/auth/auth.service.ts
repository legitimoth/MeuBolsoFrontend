import { Injectable } from '@angular/core';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { ApiService } from '../../shared/service/api-response.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private token$ = new BehaviorSubject<string | null>(null); // Token centralizado
  isAuthenticated$: Observable<boolean>; // Observable de autenticação
  user$: Observable<User | null | undefined>; // Observable do usuário

  constructor(private auth0Service: Auth0Service, private api: ApiService) {
    this.isAuthenticated$ = this.auth0Service.isAuthenticated$;
    this.user$ = this.auth0Service.user$;

    // Gerencia autenticação e busca o token
    this.auth0Service.isAuthenticated$.subscribe((authenticated) => {
      if (authenticated) {
        this.fetchToken(); // Busca o token automaticamente ao autenticar
      }
    });

    // Sempre verifica e atualiza o usuário no Auth0 após o login
    this.user$.subscribe(async (user) => {
      if (user) {
        await this.checkAndUpdateUser(user);
      }
    });
  }

  // Método para obter o token como um Observable
  getToken(): Observable<string | null> {
    return this.token$.asObservable();
  }

  // Método para buscar o token silenciosamente e atualizar o BehaviorSubject
  private fetchToken(): void {
    this.auth0Service
      .getAccessTokenSilently({ authorizationParams: { audience: 'meu-bolso-api' } })
      .subscribe((token) => {
        this.token$.next(token); // Atualiza o BehaviorSubject
      });
  }

  // Verifica e atualiza o usuário caso necessário
  private async checkAndUpdateUser(user: User): Promise<void> {
    if (!user['meuBolsoId']) {
      try {
        await this.api.post('usuarios', {
          nome: user.name,
          sobrenome: user.family_name,
          email: user.email,
        });
        // Após atualizar o usuário, força a renovação do token
        this.fetchToken();
      } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
      }
    }
  }

  // Método de login
  login(): void {
    this.auth0Service.loginWithRedirect({
      appState: { target: document.location.origin },
    });
  }

  // Método de logout
  async logout(): Promise<void> {
    if (await firstValueFrom(this.auth0Service.isAuthenticated$)) {
      this.auth0Service.logout({ logoutParams: { returnTo: document.location.origin } });
    }
  }
}
