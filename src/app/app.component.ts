import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer.component';
import { HeaderComponent } from './components/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="flex flex-col flex-grow mt-10">
      <router-outlet />
    </main>
    <app-footer class="flex flex-col"></app-footer>
  `,
  styles: ``,
})
export class AppComponent {
  title = 'order-app-frontend';
}
