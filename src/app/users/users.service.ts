import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Observable }   from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: 'user'|'admin';
  avatar: string | null;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private base = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.base}/users`);
  }

  create(dto: CreateUserDto): Observable<User> {
    return this.http.post<User>(`${this.base}/users`, dto);
  }

  update(id: number, dto: UpdateUserDto): Observable<User> {
    return this.http.patch<User>(`${this.base}/users/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/users/${id}`);
  }
}