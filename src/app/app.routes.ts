import { Routes } from '@angular/router';
import {CartaoComponent} from './modules/cartao/cartao.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cartoes', pathMatch: 'full' },
  { path: 'cartoes', component: CartaoComponent }
];
