import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [],
  template: `
    <section class="bg-white dark:bg-gray-900">
      <div class="container px-6 pt-20 pb-10 mx-auto">
        <div class="xl:flex xl:items-center xl:-mx-4">
          <div class="xl:w-1/2 xl:mx-4">
            <h1
              class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white"
            >
              About Us
            </h1>

            <p class="max-w-2xl mt-4 text-gray-500 dark:text-gray-300">
              Welcome to our platform, where innovation meets reliability. We
              specialize in delivering modern web solutions tailored to your
              needs—from seamless service booking to efficient order management.
              Our mission is to simplify your workflow with user-friendly tools
              and robust technology, ensuring a smooth and enjoyable experience
              for every user. Driven by passion and expertise, we continually
              improve and adapt to stay ahead in the fast-paced digital world.
            </p>
          </div>

          <div
            class="grid grid-cols-1 gap-8 mt-8 xl:mt-0 xl:mx-4 xl:w-1/2 md:grid-cols-2"
          >
            <div>
              <img
                class="object-cover rounded-xl aspect-square"
                src="https://devsquad-website.s3.us-east-1.amazonaws.com/blog/user-centered-design-process/devsquad-blog-how-a-user-centered-design-process-shapes-product-development-infographic-1_2eae7333981eb486ea6ceb278400f298_800.webp"
                alt=""
              />
              <h1
                class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white"
              >
                User-Focused Design
              </h1>
              <p class="mt-2 text-gray-500 capitalize dark:text-gray-300">
                We prioritize clean interfaces and intuitive user journeys,
                making every feature simple to use.
              </p>
            </div>
            <div>
              <img
                class="object-cover rounded-xl aspect-square"
                src="https://media.licdn.com/dms/image/v2/D4E12AQEpI18EuSUb_w/article-cover_image-shrink_720_1280/B4EZdaLAdHHcAM-/0/1749564524805?e=2147483647&v=beta&t=gv3Q8pbs7NPj2j1SAyJExpA8U4XjWFv4A14ymQglOCg"
                alt=""
              />
              <h1
                class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white"
              >
                Reliable Technology
              </h1>
              <p class="mt-2 text-gray-500 capitalize dark:text-gray-300">
                Our stack is built for speed and security, so you can trust your
                data and enjoy uninterrupted service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class AboutUsComponent {}
