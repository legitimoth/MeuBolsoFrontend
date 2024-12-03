import {Component, Injectable} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  imports: [
    NgForOf,
    NgClass
  ],
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  toasts: { message: string; type: 'success' | 'error' | 'info' | 'warning', closing?: boolean }[] = [];

  toastIcons = {
    success: 'bi bi-check-circle',
    error: 'bi bi-exclamation-triangle',
    info: 'bi bi-info-circle',
    warning: 'bi bi-exclamation-circle',
  };

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
    this.toasts.push({ message, type, closing: false });

    //Remove o toast após 5 segundos
    setTimeout(() => {
      const toast = this.toasts[0]; // Pega o primeiro toast
      if (toast) {
        toast.closing = true; // Ativa a classe de animação de saída

        // Remove o toast após a duração da animação de saída (1 segundo no Animate.css)
        setTimeout(() => {
          this.toasts.shift();
        }, 1000); // Tempo padrão do Animate.css para animação
      }
    }, 5000);
  }

  removeToast(index: number) {
    this.toasts[index].closing = true;
    setTimeout(() => {
      this.toasts.splice(index, 1);
    }, 1000);
  }
}
