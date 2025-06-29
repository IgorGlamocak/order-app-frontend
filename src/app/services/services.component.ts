import {Component, inject, OnInit} from '@angular/core';
import {ServicesService} from './services.service';
import {AsyncPipe} from '@angular/common';
import {SchedulerComponent} from './scheduler/scheduler.component';


@Component({
  selector: 'app-services',
  imports: [
    AsyncPipe,
    SchedulerComponent
  ],
  template: `
      <!-- Container to center and pad the grid -->
    <div class="mx-auto max-w-7xl px-4 py-10">
      <h2 class="text-3xl font-bold mb-8 dark:text-white">Our Services</h2>

      <!-- GRID WRAPPER -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        @for (service of services$ | async; track service.id) {
          <!-- CARD -->
          <div class="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
            <!-- IMAGE -->
            <div
              class="h-48 bg-gray-200 bg-cover bg-center"
              style="background-image: url('https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?...');">
            </div>
            <!-- BODY -->
            <div class="flex-1 p-4 flex flex-col">
              <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {{ service.serviceName }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {{ service.description }}
              </p>
              <!-- FOOTER -->
              <div class="mt-auto flex items-center justify-between">
                <span class="text-lg font-bold text-gray-800 dark:text-gray-200">
                  From {{ service.price }}€
                </span>
                <app-scheduler [service]="service"></app-scheduler>
              </div>
            </div>
          </div>
        }
        @empty {
          <p class="col-span-full text-center text-gray-500 dark:text-gray-400">
            You are not logged in
          </p>
        }
      </div>
    </div>
  `,
  styles: ``
})
export class ServicesComponent {
  services = inject(ServicesService);

  services$= this.services.getAll();
}
