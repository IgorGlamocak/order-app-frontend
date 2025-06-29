import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environment';
import {Service} from './services.model';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`  // Use "Bearer" if that’s your token type
  });

  getAll() {
    return this.http.get<Service[]>(`${this.baseUrl}/services`, { headers: this.headers });
  }

  deleteService(id: number) {
    return this.http.delete<Service>(`${this.baseUrl}/services/${id}`, { headers: this.headers });
  }

  editService(id: number) {
    return this.http.patch(`${this.baseUrl}/services/${id}`, { headers: this.headers });
  }

  createService() {
    return this.http.post(`${this.baseUrl}/services/`, { headers: this.headers });
  }

}
