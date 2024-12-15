export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  closing: boolean
}
