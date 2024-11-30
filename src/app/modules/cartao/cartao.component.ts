import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {Cartao} from './interface/Cartao';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
    selector: 'app-cartao',
    imports: [
        CommonModule,
        HeaderComponent,
        ReactiveFormsModule
    ],
    templateUrl: './cartao.component.html',
    styleUrl: './cartao.component.scss'
})
export class CartaoComponent {
  cartoes : Cartao[] = [
    { id: 1, nome: 'Banco Inter Mastercard', final: '0987' },
    { id: 2, nome: 'Itaucard Click Visa Platinum', final: '5643' },
    { id: 3, nome: 'Nubank Platinum', final: '1234' }
  ];

  cartaoForm: FormGroup;
  cartaoEmEdicao: Cartao | null = null;
  listarErros: boolean = false;

  constructor(private fb: FormBuilder) {
    this.cartaoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(27)]],
      final: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
    });
  }

  editar(id: number): void {
    this.cartaoEmEdicao = this.cartoes.find(e => e.id === id) ?? null;
    this.cartaoForm.patchValue({
      nome: this.cartaoEmEdicao?.nome,
      final: this.cartaoEmEdicao?.final,
    });
  }

  salvar(): void {

    if (this.cartaoForm.invalid) {
      this.listarErros = true;
      return;
    }

    if (this.cartaoEmEdicao) {
      const index = this.cartoes.findIndex(c => c.id === this.cartaoEmEdicao?.id);
      this.cartoes[index] = { ...this.cartaoEmEdicao, ...this.cartaoForm.value };

    } else {
      this.cartoes.push({
        id: this.cartoes.length + 1,
        ...this.cartaoForm.value
      });
    }

    this.limpar();
  }

  limpar(): void {
    this.cartaoForm.reset();
    this.cartaoEmEdicao = null;
    this.listarErros = false;
  }

  excluir(id: number): void {
    this.cartoes = this.cartoes.filter(cartao => cartao.id !== id);
  }
}
