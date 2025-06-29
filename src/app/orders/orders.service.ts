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
  service: {
    id: number;
    serviceName: string;
    description: string;
    price: number;
  };
  user: {
    id: number;
    fullName: string;
    email: string;
  };
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

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.base}/orders`);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/orders/${id}`);
  }
}
