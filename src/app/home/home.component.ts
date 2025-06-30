import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <section class="dark:bg-gray-900 pt-0">
      <div class="container px-6 pt-20 pb-10 mx-auto">
        <div class="xl:flex xl:items-center xL:-mx-4">
          <div class="xl:w-1/2 xl:mx-4">
            <h1
              class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white"
            >
              Welcome to Our Service Platform
            </h1>

            <p class="max-w-2xl mt-4 text-gray-500 dark:text-gray-300">
              Discover a modern web application built to simplify service
              booking and management. Whether you need IT assistance, web
              development, or design expertise, our platform connects you with
              experienced professionals in just a few clicks.
              <br /><br />
              Register or log in to unlock full access to our services and enjoy
              a streamlined, user-friendly experience. We're here to help your
              projects succeed!
            </p>
          </div>

          <div
            class="grid grid-cols-1 gap-8 mt-8 xl:mt-0 xl:mx-4 xl:w-1/2 md:grid-cols-2"
          >
            <div>
              <img
                class="object-cover rounded-xl aspect-square"
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80"
                alt="Laptop with code"
              />

              <h2
                class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white"
              >
                Easy Booking
              </h2>

              <p class="mt-2 text-gray-500 dark:text-gray-300">
                Browse and schedule services quickly and easily, all in one
                place.
              </p>
            </div>

            <div>
              <img
                class="object-cover rounded-xl aspect-square"
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=80"
                alt="Teamwork"
              />

              <h2
                class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white"
              >
                Trusted Professionals
              </h2>

              <p class="mt-2 text-gray-500 dark:text-gray-300">
                Work with skilled experts dedicated to high-quality results and
                great support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class HomeComponent {}
