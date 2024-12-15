import {Component} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {Toast} from './interface/toast';
import {ToastService} from './toast.service';

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

  toastIcons = {
    success: 'bi bi-check-circle',
    error: 'bi bi-exclamation-triangle',
    info: 'bi bi-info-circle',
    warning: 'bi bi-exclamation-circle',
  };

  constructor(public toastService: ToastService) {}

  get toasts() {
    return this.toastService.getToasts();
  }

  removeToast(index: number) {
    this.toastService.removeToast(index);
  }

}
