import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom, throwError } from 'rxjs';
import { ToastComponent } from '../toast/toast.component';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private toast: ToastComponent) {}

  private async handleRequest<T>(
    method: 'get' | 'post',
    endpoint: string,
    payload?: any
  ): Promise<T> {
    try {
      const request = method === 'get'
        ? this.http.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`)
        : this.http.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, payload);

      return await firstValueFrom(
        request.pipe(
          map((response) => {
            console.log(response);
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
      this.toast.error('Ocorreu um erro inesperado');
      console.error(`Erro ao fazer o ${method.toUpperCase()} em ${endpoint}:`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.handleRequest<T>('get', endpoint);
  }

  async post<T>(endpoint: string, payload: T): Promise<T> {
    return this.handleRequest<T>('post', endpoint, payload);
  }
}
