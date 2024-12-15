import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {firstValueFrom, Observable, throwError} from 'rxjs';
import {ToastService} from '../toast/toast.service';
import {env} from '@env/environment';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient, private toast: ToastService) {}

  private async handleRequest<T>(request: Observable<ApiResponse<T>>): Promise<T> {
    try {
      return await firstValueFrom(
        request.pipe(
          map((response) => {
            if (!response.success) {
              this.toast.error(response.errors.join(', '));
              throw new Error(response.errors.join(', '));
            }

            return response.data;
          }),
          catchError((error) => {
            this.toast.error('Ocorreu um erro inesperado');
            return throwError(() => error);
          })
        )
      );
    } catch (error) {
      this.toast.error('Erro ao realizar a requisição.');
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    const request = this.http.get<ApiResponse<T>>(`${env.apiUrl}/${endpoint}`);
    return this.handleRequest<T>(request);
  }

  async post<T>(endpoint: string, payload: T): Promise<T> {
    const request = this.http.post<ApiResponse<T>>(`${env.apiUrl}/${endpoint}`, payload);
    return this.handleRequest<T>(request);
  }
}
