import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <nav class="bg-white shadow dark:bg-gray-800">
      <div class="container flex items-center justify-between p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <div class="flex space-x-4">
          <a routerLink="/"
             class="text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">
            Home
          </a>
          <a routerLink="/services"
             class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
            Services
          </a>
          <a routerLink="/orders"
             class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
            Orders
          </a>
          <a routerLink="/blog"
             class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
            Blog
          </a>
        </div>
        <div class="flex space-x-4">
          @if (authService.isLoggedIn()) {
            <button type="button" (click)="logout()"
                    class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
              Logout
            </button>
          } @else {
            <a routerLink="/login"
               class="text-gray-800 dark:text-gray-200 hover:underline">
              Login
            </a>
          }
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): Promise<boolean> {
    this.authService.logout();
    return this.router.navigate(['/login']);
  }

}
