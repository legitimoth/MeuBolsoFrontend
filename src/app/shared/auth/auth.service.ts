import { Injectable } from '@angular/core';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';
import {Observable, firstValueFrom, filter, switchMap, BehaviorSubject} from 'rxjs';
import { ApiService } from '../service/api-response.service';
import { env } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$: Observable<string | null> = this.tokenSubject.asObservable();
  isAuthenticated$: Observable<boolean>;
  user$: Observable<User | null | undefined>;
  private readySubject = new BehaviorSubject<boolean>(false);
  ready$: Observable<boolean> = this.readySubject.asObservable();

  constructor(private auth0Service: Auth0Service, private api: ApiService) {
    this.isAuthenticated$ = this.auth0Service.isAuthenticated$;
    this.user$ = this.auth0Service.user$;
    this.monitorarToken();
    this.verificarRegistro();
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

  verificarRegistro(): void {
    this.user$.pipe(
      filter(user => !!user),
      switchMap(async (user) => {
        if(!user[env.usuarioId]) {
          await this.registrar(user);
          await this.refreshToken();
        }

        return true;
      })
    ).subscribe({
      next: async (isReady) => {
        await firstValueFrom(this.token$.pipe(filter(token => !!token)));
        this.readySubject.next(isReady)
      },
      error: (err) => {
        console.error('Erro ao verificar registro:', err);
        this.readySubject.next(false);
      },
    });
  }

  private async registrar(usuario: User): Promise<void> {
    try {
      await this.api.post('usuarios', {
        nome: usuario.name,
        sobrenome: usuario.family_name,
        email: usuario.email,
      });
    }catch (error) {
      console.error('erro aqui', error);
    }

  }

  private monitorarToken(): void {
    this.auth0Service
      .getAccessTokenSilently({
        authorizationParams: { audience: env.auth0.audience },
      })
      .subscribe({
        next: (token) => {
          this.tokenSubject.next(token);
        },
        error: (err) => {
          console.error('Erro ao monitorar token:', err);
          this.tokenSubject.next(null);
        },
      });
  }

  async refreshToken(): Promise<void> {
    try {
      const token = await firstValueFrom(
        this.auth0Service.getAccessTokenSilently({
          cacheMode: 'off',
          authorizationParams: { audience: env.auth0.audience },
        })
      );
      this.tokenSubject.next(token);
    } catch (error) {
      console.error('Erro ao atualizar o token:', error);
    }
  }
}
