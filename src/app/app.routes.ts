import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrdersComponent } from './orders/orders.component';
import { ServicesComponent } from './services/services.component';
import { UsersComponent } from './users/users.component';
import { AdminGuard } from './auth/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
];
