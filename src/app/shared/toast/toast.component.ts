import {Component, Injectable} from '@angular/core';
import {NgForOf} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  toasts: { message: string; type: 'success' | 'error' | 'info' }[] = [];

  success(message: string) {
    this.addToast(message, 'success');
  }

  error(message: string) {
    this.addToast(message, 'error');
  }

  info(message: string) {
    this.addToast(message, 'info');
  }

  private addToast(message: string, type: 'success' | 'error' | 'info') {
    this.toasts.push({ message, type });

    // Remove o toast após 5 segundos
    setTimeout(() => this.toasts.shift(), 5000);
  }

  removeToast(index: number) {
    this.toasts.splice(index, 1);
  }
}
