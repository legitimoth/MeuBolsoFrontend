import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './modules/navbar/navbar.component';
import {CartaoComponent} from './modules/cartao/cartao.component';
import {ToastComponent} from './shared/toast/toast.component';

@Component({
    selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ToastComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MeuBolsoFrontend';
}
