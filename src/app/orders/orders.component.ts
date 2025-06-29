import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { OrdersService } from './orders.service';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  template: `
    <div class="p-6 max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">
        {{ role === 'admin' ? 'All Orders' : 'My Orders' }}
      </h2>
      <ul class="space-y-4">
        @for (order of orders$ | async; track order.id) {
          <li class="border rounded-lg p-4 flex items-start">
            <div class="flex-1">
              @if (role === 'admin') {
                <div class="mb-2 p-2 bg-gray-100 rounded">
                  <strong>User:</strong>
                  {{ order.user.fullName }} ({{ order.user.email }})
                </div>
              }
              <div class="mb-2">
                <strong>Date:</strong> {{ order.orderDate | date: 'medium' }}
              </div>
              <div class="mb-2">
                <strong>Service:</strong> {{ order.service.serviceName }}
              </div>
              <div class="mb-2">
                <strong>Quantity:</strong> {{ order.quantity }}
              </div>
              <div>
                <strong>Total:</strong> {{ order.totalPrice | currency: 'EUR' }}
              </div>
            </div>
            <div class="ml-4 self-center">
              <button
                (click)="onDelete(order.id)"
                class="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        } @empty {
          <li class="text-center text-gray-500 dark:text-gray-400">
            You have no orders yet.
          </li>
        }
      </ul>
    </div>
  `,
})
export class OrdersComponent implements OnInit {
  private ordersService = inject(OrdersService);
  private authService = inject(AuthService);

  orders$ = this.ordersService.getOrders();
  role: string | null = this.authService.getUserRole();

  ngOnInit() {}

  onDelete(orderId: number) {
    this.ordersService
      .deleteOrder(orderId)
      .pipe(
        tap(() => {
          this.orders$ = this.ordersService.getOrders();
        }),
      )
      .subscribe();
  }
}
