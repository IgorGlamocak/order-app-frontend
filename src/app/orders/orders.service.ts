import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id: number;
  orderDate: string;
  quantity: number;
  totalPrice: number;
  userId: number;
  serviceId: number;
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private base = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createOrder(dto: {
    serviceId: number;
    quantity: number;
    totalPrice: number;
  }): Observable<Order> {
    return this.http.post<Order>(`${this.base}/orders`, dto);
  }
}