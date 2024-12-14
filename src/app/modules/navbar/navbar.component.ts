import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component';
import {AuthService} from '../../shared/auth/auth.service';
import {User} from '@auth0/auth0-angular';

@Component({
    selector: 'app-navbar',
  imports: [
    RouterLink,
    ConfirmModalComponent
  ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  user: User | null | undefined;

  constructor(private authService: AuthService) {
    authService.user$.subscribe(user => this.user = user);
  }

  logout(): void {
    this.authService.logout();
  }

  logoutMessage(): string {
    return `Olá, ${this.user?.name}. Você realmente deseja sair?`;
  }
}
