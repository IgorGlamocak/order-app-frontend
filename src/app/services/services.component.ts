import {Component, inject, OnInit} from '@angular/core';
import {ServicesService} from './services.service';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'app-services',
  imports: [
    AsyncPipe
  ],
  template: `
    @for (service of services$ | async; track service.id){
      <div class="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <div class="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style="background-image: url(https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)"></div>

        <div class="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
          <h3 class="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white" >{{service.serviceName}}</h3>
          <p class="py-2 tracking-wide text-center text-gray-800 dark:text-white" >{{service.description}}</p>

          <div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
            <span class="font-bold text-gray-800 dark:text-gray-200">{{service.price}}</span>
            <button class="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">Add to cart</button>
          </div>
        </div>
      </div>
    } @empty {
      <p>You are not logged in</p>
    }
  `,
  styles: ``
})
export class ServicesComponent {
  services = inject(ServicesService);

  services$= this.services.getAll();
}
