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
    'Authorization': `Bearer ${this.token}`
  });

  getAll() {
    return this.http.get<Service[]>(`${this.baseUrl}/services`, { headers: this.headers });
  }

  deleteService(id: number) {
    return this.http.delete<Service>(`${this.baseUrl}/services/${id}`, { headers: this.headers });
  }

  createService(dto: Omit<Service, 'id'>) {
  return this.http.post<Service>(`${this.baseUrl}/services`, dto, { headers: this.headers });
}

  updateService(id: number, dto: Partial<Omit<Service, 'id'>>) {
    return this.http.patch<Service>(`${this.baseUrl}/services/${id}`, dto, { headers: this.headers });
  }

}
export type { Service };

