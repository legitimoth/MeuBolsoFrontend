import { Injectable } from '@angular/core';
import {AuthService as Auth0Service, User} from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  token: string | null | undefined;
  user: User | null | undefined;

  constructor(private auth0Service: Auth0Service) {
    auth0Service.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
    auth0Service.getAccessTokenSilently().subscribe(token => {
      this.token = token;
    })
    auth0Service.user$.subscribe(user => {
      this.user = user;
    })
  }

  logout(): void {
    if (this.auth0Service.isAuthenticated$) {
      this.auth0Service.logout({ logoutParams: { returnTo: document.location.origin } })
    }
  }
}
