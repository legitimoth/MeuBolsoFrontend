import { Injectable } from '@angular/core';
import {Toast} from './interface/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Toast[] = [];

  getToasts() {
    return this.toasts;
  }


  success(message: string) {
    this.addToast(message, 'success');
  }

  error(message: string) {
    this.addToast(message, 'error');
  }

  info(message: string) {
    this.addToast(message, 'info');
  }

  warning(message: string) {
    this.addToast(message, 'warning');
  }

  private addToast(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    const index = this.toasts.length; // Calcula o índice do novo toast
    this.toasts.push({ message, type, closing: false });

    // Marca o toast como "fechando" após 5 segundos e remove após a animação
    setTimeout(() => this.removeToastWithAnimation(index), 5000);
  }

  private removeToastWithAnimation(index: number) {
    if (this.toasts[index]) {
      this.toasts[index].closing = true;
      setTimeout(() => {
        this.toasts.splice(index, 1);
      }, 500); // O tempo deve coincidir com a duração da animação (500ms)
    }
  }

  removeToast(index: number) {
    this.removeToastWithAnimation(index);
  }
}
