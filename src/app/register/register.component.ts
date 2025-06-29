import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
        <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div class="px-6 py-4">
            <div class="flex justify-center mx-auto">
              <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="">
            </div>

            <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome</h3>

            <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Register</p>

            <form [formGroup]="registerForm" (ngSubmit)="submit()">
              <div class="w-full mt-4">
                <input formControlName="fullName"
                       class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                       type="email" placeholder="Full name"/>
                <input formControlName="email"
                       class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                       type="email" placeholder="Email Address" aria-label="Email Address"/>
              </div>

              <div class="w-full mt-4">
                <input formControlName="password"
                       class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                       type="password" placeholder="Password"/>
                <input formControlName="confirmPassword"
                       class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                       type="password" placeholder="Confirm password"/>
              </div>

              <div class="flex items-center justify-between mt-4">
                <button type="submit" [disabled]="registerForm.invalid"
                        class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Sign In
                </button>
              </div>
            </form>
          </div>

          <div class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            <span class="text-sm text-gray-600 dark:text-gray-200">Already have an account? </span>

            <a routerLink="/login"
               class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Login</a>
          </div>
        </div>
  `
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);

  error: string = '';

  registerForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  url = 'http://localhost:3000/auth/register';

  async submit(): Promise<void> {
    if (this.registerForm.invalid) return;

    const { password, confirmPassword, fullName, email } = this.registerForm.value;

    if (password !== confirmPassword) {
      console.error('Gesli se ne ujemata!');
      return;
    }

    const data = { fullName, email, password };
    console.log(data);

    try {
      const response = await firstValueFrom(
        this.http.post(this.url, data, { observe: 'response' })
      );
      console.log(response);

      if (response.status === 201) {
        await this.router.navigate(['/login']);
      }
    } catch (err) {
      console.error('Registration failed', err);
    }
  }
}
