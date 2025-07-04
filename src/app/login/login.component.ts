import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { RouterLink } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  template: `
    <div class="min-h-screen flex justify-center items-start py-10">
      <div
        class="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <div class="px-6 py-4">
          <div class="flex justify-center mx-auto">
            <img
              class="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>

          <h3
            class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200"
          >
            Welcome Back
          </h3>

          <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Login</p>

          <form
            [formGroup]="loginForm"
            (ngSubmit)="this.submit$.next(this.loginForm.getRawValue())"
          >
            <div class="w-full mt-4">
              <input
                formControlName="email"
                class="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
              />
            </div>

            <div class="w-full mt-4">
              <input
                formControlName="password"
                class="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
            </div>

            <div class="flex items-center justify-between mt-4">
              <a
                href="#"
                class="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
                >Forgot Password?</a
              >

              <button
                [disabled]="loginForm.invalid"
                type="submit"
                class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        <div
          class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700"
        >
          <span class="text-sm text-gray-600 dark:text-gray-200"
            >Don't have an account?
          </span>
          <a
            routerLink="/register"
            class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
            >Register</a
          >
        </div>
      </div>
    </div>
    @if (status$ | async; as status) {
      <p class="mx-2 text-sm font-bold text-red-600 flex justify-center">
        {{ status }}
      </p>
    }
  `,
  styles: ``,
})
export class LoginComponent {
  auth = inject(AuthService);
  fb = inject(FormBuilder);
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit$ = new Subject<User>();
  status$ = this.submit$.pipe(switchMap((status) => this.auth.login(status)));
}

export interface User {
  email: string;
  password: string;
}
