import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ServicesService, Service } from './services.service';
import { ServiceFormModalComponent } from './service-form-modal.component';
import { DescriptionComponent } from './info/description.component';
import { AuthService } from '../auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    ServiceFormModalComponent,
    DescriptionComponent,
    RouterLink,
  ],
  template: `
    <div class="min-h-screen flex justify-center items-start py-10 bg-white">
      <div class="p-6">
        @if (authService.isAdmin()) {
          <div class="flex justify-end mb-6">
            <button
              class="px-4 py-2 bg-green-600 text-white rounded"
              (click)="openCreate()"
            >
              Add Service
            </button>
          </div>
        }
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto justify-center"
        >
          @for (service of services$ | async; track service.id) {
            <div
              class="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 relative"
            >
              @if (authService.isAdmin()) {
                <button
                  class="absolute top-2 right-2 p-1 text-2xl font-bold text-gray-500 hover:text-white"
                  (click)="openMenu(service, $event)"
                >
                  ⋮
                </button>
              }
              <div
                class="h-48 bg-gray-200 bg-cover bg-center"
                [style.background-image]="
                  'url(' + (service.imageUrl || placeholderImg) + ')'
                "
              ></div>
              <div class="flex-1 p-4 flex flex-col">
                <h3
                  class="text-xl font-semibold mb-2 text-gray-800 dark:text-white"
                >
                  {{ service.serviceName }}
                </h3>
                <p
                  class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
                >
                  {{ service.description }}
                </p>
                <div class="mt-auto flex items-center justify-between">
                  <span
                    class="text-lg font-bold text-gray-800 dark:text-gray-200"
                  >
                    From {{ service.price }}€
                  </span>
                  <app-description [service]="service"></app-description>
                </div>
              </div>
            </div>
          } @empty {
            <p class="col-span-full text-center text-gray-600">
              No services available.
              <a
                routerLink="/login"
                class="text-blue-600 underline hover:text-blue-800 ml-1"
              >
                Log in
              </a>
              to view our services.
            </p>
          }
        </div>
        @if (menuOpen()) {
          <div class="fixed inset-0" (click)="closeMenu()"></div>
          <div
            class="absolute z-50 bg-white rounded shadow p-2"
            [style.top.px]="menuPos.y"
            [style.left.px]="menuPos.x"
          >
            <button
              class="block w-full text-left p-1 hover:bg-gray-100"
              (click)="edit()"
            >
              Edit
            </button>
            <button
              class="block w-full text-left p-1 hover:bg-gray-100"
              (click)="confirmDelete()"
            >
              Delete
            </button>
          </div>
        }
        @if (confirmOpen()) {
          <div
            class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div class="bg-white p-6 rounded shadow-lg">
              <p class="mb-4">Are you sure you want to delete this service?</p>
              <div class="flex justify-end space-x-2">
                <button
                  class="px-3 py-1 bg-gray-400 text-white rounded"
                  (click)="cancelDelete()"
                >
                  No
                </button>
                <button
                  class="px-3 py-1 bg-red-600 text-white rounded"
                  (click)="delete()"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        }
        <app-service-form-modal
          [isOpen]="formOpen()"
          [editing]="isEditing()"
          [initial]="selected()"
          (closed)="closeForm()"
          (saved)="reload()"
        ></app-service-form-modal>
      </div>
    </div>
  `,
})
export class ServicesComponent implements OnInit {
  constructor(public authService: AuthService) {}
  private svc = inject(ServicesService);
  services$ = this.svc.getAll();
  placeholderImg =
    'https://img.freepik.com/premium-vector/service-outline-doodle-design-illustration-symbol_848977-787.jpg';

  formOpen = signal(false);
  isEditing = signal(false);
  selected = signal<Service | null>(null);

  menuOpen = signal(false);
  menuPos = { x: 0, y: 0 };

  confirmOpen = signal(false);

  ngOnInit() {}

  openCreate() {
    this.selected.set(null);
    this.isEditing.set(false);
    this.formOpen.set(true);
  }

  openMenu(service: Service, e: MouseEvent) {
    this.selected.set(service);
    this.menuPos = { x: e.clientX, y: e.clientY };
    this.menuOpen.set(true);
  }
  closeMenu() {
    this.menuOpen.set(false);
  }

  edit() {
    this.isEditing.set(true);
    this.formOpen.set(true);
    this.closeMenu();
  }

  confirmDelete() {
    this.confirmOpen.set(true);
    this.closeMenu();
  }
  cancelDelete() {
    this.confirmOpen.set(false);
  }
  delete() {
    const svc = this.selected();
    if (!svc) return;
    this.svc.deleteService(svc.id).subscribe(() => {
      this.confirmOpen.set(false);
      this.reload();
    });
  }

  closeForm() {
    this.formOpen.set(false);
  }
  reload() {
    this.services$ = this.svc.getAll();
  }
}
