import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="bg-white shadow dark:bg-gray-800">
      <div
        class="container flex items-center justify-between p-6 mx-auto text-gray-600 capitalize dark:text-gray-300"
      >
        <div class="flex space-x-4">
          <a
            routerLink="/"
            routerLinkActive="!border-blue-500 text-gray-800 dark:text-gray-200"
            [routerLinkActiveOptions]="{ exact: true }"
            class="transition-colors duration-300 transform mx-1.5 sm:mx-6 border-b-2 border-transparent hover:border-blue-500"
          >
            Home
          </a>
          <a
            routerLink="/services"
            routerLinkActive="!border-blue-500 text-gray-800 dark:text-gray-200"
            class="transition-colors duration-300 transform mx-1.5 sm:mx-6 border-b-2 border-transparent hover:border-blue-500"
          >
            Services
          </a>
          <a
            routerLink="/orders"
            routerLinkActive="!border-blue-500 text-gray-800 dark:text-gray-200"
            class="transition-colors duration-300 transform mx-1.5 sm:mx-6 border-b-2 border-transparent hover:border-blue-500"
          >
            Orders
          </a>
          @if (authService.isAdmin()) {
            <a
              routerLink="/users"
              routerLinkActive="!border-blue-500 text-gray-800 dark:text-gray-200"
              class="transition-colors duration-300 transform mx-1.5 sm:mx-6 border-b-2 border-transparent hover:border-blue-500"
            >
              Users
            </a>
          }
        </div>
        <div class="flex space-x-4">
          @if (authService.isLoggedIn()) {
            <button
              type="button"
              (click)="logout()"
              class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Logout
            </button>
          } @else {
            <a
              routerLink="/login"
              class="text-gray-800 dark:text-gray-200 hover:underline"
            >
              Login
            </a>
          }
        </div>
      </div>
    </nav>
  `,
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  logout(): Promise<boolean> {
    this.authService.logout();
    return this.router.navigate(['/login']);
  }
}
