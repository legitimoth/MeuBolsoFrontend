import { Routes } from '@angular/router';
import {CartaoComponent} from './modules/cartao/cartao.component';
import {authGuard} from './modules/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/cartoes', pathMatch: 'full' },
  { path: 'cartoes', component: CartaoComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
