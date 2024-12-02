import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component';
import {AuthService} from '../auth/auth-service.service';

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
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  logoutMessage(): string {
    return `Olá, ${this.authService.user?.name}. Você realmente deseja sair?`;
  }
}
