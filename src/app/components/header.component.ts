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
        <button
          class="sm:hidden flex flex-col items-center justify-center w-8 h-8"
          (click)="toggleMenu()"
          aria-label="Toggle menu"
          type="button"
        >
          <span class="block w-6 h-0.5 bg-white mb-1"></span>
          <span class="block w-6 h-0.5 bg-white mb-1"></span>
          <span class="block w-6 h-0.5 bg-white"></span>
        </button>
        <div class="hidden sm:flex space-x-4">
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
          @if (authService.isLoggedIn()) {
            <a
              routerLink="/orders"
              routerLinkActive="!border-blue-500 text-gray-800 dark:text-gray-200"
              class="transition-colors duration-300 transform mx-1.5 sm:mx-6 border-b-2 border-transparent hover:border-blue-500"
            >
              Orders
            </a>
          }
          <a
            routerLink="/about-us"
            routerLinkActive="!border-blue-500 text-gray-800 dark:text-gray-200"
            class="transition-colors duration-300 transform mx-1.5 sm:mx-6 border-b-2 border-transparent hover:border-blue-500"
          >
            About us
          </a>
          <a
            routerLink="/our-team"
            routerLinkActive="!border-blue-500 text-gray-800 dark:text-gray-200"
            class="transition-colors duration-300 transform mx-1.5 sm:mx-6 border-b-2 border-transparent hover:border-blue-500"
          >
            Our team
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
        <div class="hidden sm:flex space-x-4">
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
      @if (menuOpen) {
        <div class="sm:hidden px-6 pb-4 bg-gray-900">
          <div class="flex flex-col items-start space-y-2">
            <a
              routerLink="/"
              [routerLinkActiveOptions]="{ exact: true }"
              routerLinkActive="border-b-2 border-custom-blue"
              class="text-white border-b-2 border-transparent hover:border-custom-blue transition-all duration-300 px-1 py-1 inline-block"
              (click)="toggleMenu()"
              >Home</a
            >
            <a
              routerLink="/services"
              routerLinkActive="border-b-2 border-custom-blue"
              class="text-white border-b-2 border-transparent hover:border-custom-blue transition-all duration-300 px-1 py-1 inline-block"
              (click)="toggleMenu()"
              >Services</a
            >
            @if (authService.isLoggedIn()) {
              <a
                routerLink="/orders"
                routerLinkActive="border-b-2 border-custom-blue"
                class="text-white border-b-2 border-transparent hover:border-custom-blue transition-all duration-300 px-1 py-1 inline-block"
                (click)="toggleMenu()"
                >Orders</a
              >
            }
            <a
              routerLink="/about-us"
              routerLinkActive="border-b-2 border-custom-blue"
              class="text-white border-b-2 border-transparent hover:border-custom-blue transition-all duration-300 px-1 py-1 inline-block"
              (click)="toggleMenu()"
              >About us</a
            >
            <a
              routerLink="/our-team"
              routerLinkActive="border-b-2 border-custom-blue"
              class="text-white border-b-2 border-transparent hover:border-custom-blue transition-all duration-300 px-1 py-1 inline-block"
              (click)="toggleMenu()"
              >Our Team</a
            >
            @if (authService.isAdmin()) {
              <a
                routerLink="/users"
                routerLinkActive="border-b-2 border-custom-blue"
                class="text-white border-b-2 border-transparent hover:border-custom-blue transition-all duration-300 px-1 py-1 inline-block"
                (click)="toggleMenu()"
                >Users</a
              >
            }
          </div>
          <div class="flex flex-col space-y-2 mt-4">
            @if (authService.isLoggedIn()) {
              <button
                type="button"
                (click)="logout(); toggleMenu()"
                class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Logout
              </button>
            } @else {
              <a
                routerLink="/login"
                class="text-white hover:underline"
                (click)="toggleMenu()"
                >Login</a
              >
            }
          </div>
        </div>
      }
    </nav>
  `,
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout(): Promise<boolean> {
    this.authService.logout();
    return this.router.navigate(['/login']);
  }
}
