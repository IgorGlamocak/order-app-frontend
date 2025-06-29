import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ServicesService } from '../services/services.service';
import { Service } from '../services/services.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe
  ],
  template: `
    <section class="container px-4 mx-auto">
      <div class="sm:flex sm:items-center sm:justify-between">
        <h2 class="text-lg font-medium text-gray-800 dark:text-white">Files uploaded</h2>

        <div class="flex items-center mt-4 gap-x-3">
          <button
            class="w-1/2 px-5 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-white dark:border-gray-700">
            Download all
          </button>

          <button
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3098_154395)">
                <path
                  d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                  stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_3098_154395">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>

            <span>Upload</span>
          </button>
        </div>
      </div>

      <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col"
                      class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <div class="flex items-center gap-x-3">
                      <input type="checkbox"
                             class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700">
                      <span>Service name</span>
                    </div>
                  </th>

                  <th scope="col"
                      class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Service description
                  </th>

                  <th scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Price
                  </th>
                  <th scope="col" class="relative py-3.5 px-4">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  @for (service of services$ | async; track service.id) {
                <tr>
                  <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div class="inline-flex items-center gap-x-3">
                      <input type="checkbox"
                             class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700">

                      <div class="flex items-center gap-x-2">
                        <div
                          class="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                               stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                          </svg>
                        </div>

                        <div>
                          <h2 class="font-normal text-gray-800 dark:text-white ">{{service.id}}</h2>
                          <p class="text-xs font-normal text-gray-500 dark:text-gray-400">{{service.serviceName}}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                    {{service.description}}
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{{service.price}}</td>
                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                    <button (click)="deleteService(service.id)"
                      class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
                  }
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                </svg>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
<!--    <div>-->
<!--      <h2>Admin Panel</h2>-->
<!--      <form [formGroup]="serviceForm" (ngSubmit)="onSubmit()">-->
<!--        <div>-->
<!--          <label for="serviceName">Ime storitve:</label>-->
<!--          <input id="serviceName" formControlName="serviceName" type="text" />-->
<!--        </div>-->
<!--        <div>-->
<!--          <label for="description">Opis storitve:</label>-->
<!--          <textarea id="description" formControlName="description"></textarea>-->
<!--        </div>-->
<!--        <button type="submit">{{ editing ? 'Posodobi' : 'Ustvari' }}</button>-->
<!--        <button type="button" (click)="resetForm()">Prekliči</button>-->
<!--      </form>-->

<!--      <hr />-->

<!--      <div>-->
<!--        <h3>Seznam storitev</h3>-->
<!--        <ul>-->
<!--          @for (service of services$ | async; track service.id) {-->
<!--            <li>-->
<!--              <strong>{{ service.serviceName }}</strong>: {{ service.description }}-->
<!--              <button (click)="editService(service)">Uredi</button>-->
<!--              <button (click)="deleteService(service.id)">Briši</button>-->
<!--            </li>-->
<!--          }-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->
  `,
  styles: [``]
})
export class AdminDashboardComponent {
  private services = inject(ServicesService);
  private fb = inject(FormBuilder);

  editing = false;
  currentServiceId: number | null = null;
  services$ = this.services.getAll();


  serviceForm = this.fb.nonNullable.group({
    serviceName: ['', Validators.required],
    description: ['', Validators.required]
  });



  /*onSubmit(): void {
    if (this.serviceForm.valid) {
      const serviceData = this.serviceForm.value as Omit<Service, 'id' | 'price' | 'orders'>;
      if (this.editing && this.currentServiceId !== null) {
        this.serviceService.updateService(this.currentServiceId, serviceData).subscribe({
          next: (response: any) => {
            console.log('Storitev posodobljena:', response);
          },
          error: (err: any) => {
            console.error('Napaka pri posodabljanju storitve:', err);
          },
          complete: () => {
            this.resetForm();
            this.refreshServices();
          }
        });
      } else {
        this.serviceService.createService(serviceData).subscribe({
          next: (response: any) => {
            console.log('Storitev ustvarjena:', response);
          },
          error: (err: any) => {
            console.error('Napaka pri ustvarjanju storitve:', err);
          },
          complete: () => {
            this.resetForm();
            this.refreshServices();
          }
        });
      }
    }
  }

  editService(service: Service): void {
    this.editing = true;
    this.currentServiceId = service.id;
    this.serviceForm.patchValue({
      serviceName: service.serviceName,
      description: service.description
    });
  }
 */
  deleteService(id: number): void {
    this.services.deleteService(id).subscribe({
      next: (response: any) => {
        console.log('Storitev izbrisana:', response);
      },
      error: (err: any) => {
        console.error('Napaka pri brisanju storitve:', err);
      },
      complete: () => {
        window.location.reload();
      }
    });
  }

}
