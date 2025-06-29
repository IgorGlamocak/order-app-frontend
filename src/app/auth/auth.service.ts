import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { catchError, of, tap, throwError } from 'rxjs';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
//import * as jwt_decode from 'jwt-decode';

export interface Auth {
  message: string;
  token: string;
}

interface JwtPayload {
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);
  router = inject(Router);
  register(data: { fullName: string; email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: { email: string; password: string }) {
    /*.subscribe({
      next:(response) => {
        localStorage.setItem('token', response.token)
        console.log('Login successful', response);
      },
      error:(err) => {
        console.error('Login failed', err);
      } ,
      complete:() => {
        this.loginForm.reset();
        this.router.navigate(['']);
      }
    });
    */
    // Vrne Observable z { access_token: string }
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        console.log('Login successful', res);
      }),
      tap(() => this.router.navigate([''])),
      catchError((err) => {
        console.error('Login failed.', err);
        return of('Login failed.');
      }),
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role as string;
    } catch {
      return null;
    }
  }
}
