import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  imports: [
    NgIf
  ],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  @Input() title: string = 'Confirmação';
  @Input() message: string = 'Realmente deseja realizar essa ação?';
  @Output() onConfirm = new EventEmitter<void>();
  isModalVisible: boolean = false;

  // Abre a modal
  openModal(): void {
    this.isModalVisible = true;
    this.preventBodyScroll();
  }

  // Fecha a modal
  closeModal(): void {
    this.isModalVisible = false;
    this.enableBodyScroll();
  }

  // Confirma a ação e fecha a modal
  confirmAction(): void {
    this.onConfirm.emit();
    this.closeModal();
  }

  // Impede o scroll no corpo, mas mantém cliques ativos
  private preventBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  // Restaura o scroll no corpo
  private enableBodyScroll(): void {
    document.body.style.overflow = '';
  }

  // Fecha a modal ao pressionar Esc
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.isModalVisible) {
      this.closeModal();
    }
  }
}
