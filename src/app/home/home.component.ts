import { Component } from '@angular/core';
import { FooterComponent } from '../components/footer.component';
import { HeaderComponent } from '../components/header.component';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <section class="bg-white dark:bg-gray-900">
      <div class="container px-6 py-10 mx-auto">
        <div class="xl:flex xl:items-center xL:-mx-4">
          <div class="xl:w-1/2 xl:mx-4">
            <h1
              class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white"
            >
              Our Team
            </h1>

            <p class="max-w-2xl mt-4 text-gray-500 dark:text-gray-300">
              Our hand-picked group of professionals brings together diverse
              talents and shared passion for excellence. From cutting-edge
              full-stack development to inspired graphic design, each member is
              committed to delivering top-tier solutions and exceptional
              service. We collaborate closely, harnessing our collective
              expertise to transform ideas into reality and ensure every project
              exceeds expectations.
            </p>
          </div>

          <div
            class="grid grid-cols-1 gap-8 mt-8 xl:mt-0 xl:mx-4 xl:w-1/2 md:grid-cols-2"
          >
            <div>
              <img
                class="object-cover rounded-xl aspect-square"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
              />

              <h1
                class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white"
              >
                John Doe
              </h1>

              <p class="mt-2 text-gray-500 capitalize dark:text-gray-300">
                Full stack developer
              </p>
            </div>

            <div>
              <img
                class="object-cover rounded-xl aspect-square"
                src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />

              <h1
                class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white"
              >
                Mia
              </h1>

              <p class="mt-2 text-gray-500 capitalize dark:text-gray-300">
                Graphic Designer
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
