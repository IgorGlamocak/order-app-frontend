import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environment';
import {Service} from './services.model';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAll() {
    const token = localStorage.getItem('token');  // Replace with your actual token
    if (!token) {
      return;
    }
    // Create HTTP headers and include the authorization token.
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Use "Bearer" if that’s your token type
    });
    return this.http.get<Service[]>(`${this.baseUrl}/services`, { headers });
  }

}
