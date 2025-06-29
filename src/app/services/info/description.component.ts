import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service } from '../services.model';
import { OrdersService } from '../../orders/orders.service';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <button
      (click)="openScheduleModal(service)"
      class="px-3 py-1 text-sm font-semibold text-white uppercase bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
    >
      Details
    </button>

    @if (isModalOpen) {
      <div
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl p-6 relative"
        >
          <button
            (click)="closeScheduleModal()"
            class="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            &times;
          </button>

          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {{ service?.serviceName }}
            </h2>
            <div
              class="border border-gray-400 px-3 py-1 rounded text-sm text-gray-700 dark:text-gray-300"
            >
              Execution time: {{ service?.executionTime ?? '—' }}
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/3">
              <img
                [src]="service?.imageUrl ?? placeholderImg"
                alt="{{ service?.serviceName }}"
                class="w-full h-auto rounded object-cover"
              />
            </div>
            <div class="md:w-2/3 text-gray-700 dark:text-gray-300">
              {{ service?.description }}
            </div>
          </div>

          <div class="mt-8 flex flex-col md:flex-row gap-6">
            <div class="md:w-1/2">
              <label
                for="requirements"
                class="block mb-2 text-gray-700 dark:text-gray-200"
              >
                Additional requirements:
              </label>
              <textarea
                id="requirements"
                [(ngModel)]="additionalRequirements"
                rows="4"
                class="w-full border border-gray-400 rounded p-2 dark:bg-gray-700 dark:text-gray-200"
              ></textarea>
            </div>
            <div class="md:w-1/2 flex flex-col justify-between">
              <div>
                <label
                  for="priceSelect"
                  class="block mb-2 text-gray-700 dark:text-gray-200"
                >
                  Price:
                </label>
                <select
                  id="priceSelect"
                  [(ngModel)]="selectedPrice"
                  class="w-full border border-gray-400 rounded p-2 dark:bg-gray-700 dark:text-gray-200"
                >
                  <option [value]="service?.price">
                    Basic ({{ service?.price }}$)
                  </option>
                </select>
              </div>
              <button
                (click)="checkout()"
                class="mt-4 md:mt-0 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class DescriptionComponent {
  @Input() service?: Service;

  isModalOpen = false;
  placeholderImg =
    'https://img.freepik.com/premium-vector/service-outline-doodle-design-illustration-symbol-white-background-eps-10-file_848977-787.jpg';
  additionalRequirements = '';
  selectedPrice?: number;
  quantity = 1;

  constructor(private orders: OrdersService) {}

  openScheduleModal(svc?: Service) {
    if (!svc) return;
    this.service = svc;
    this.selectedPrice = svc.price;
    this.quantity = 1;
    this.isModalOpen = true;
  }

  closeScheduleModal() {
    this.isModalOpen = false;
  }

  checkout() {
    if (!this.service) return;
    const dto = {
      serviceId: this.service.id,
      quantity: this.quantity,
      totalPrice: Number(this.selectedPrice),
    };
    this.orders.createOrder(dto).subscribe({
      next: (order) => console.log('Order created', order),
      error: (err) => console.error('Failed to create order', err),
      complete: () => this.closeScheduleModal(),
    });
  }
}
