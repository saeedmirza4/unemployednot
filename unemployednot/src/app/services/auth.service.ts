import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:5039/api';
  loggedIn = signal(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.api}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post<any>(`${this.api}/auth/login`, data);
  }

  saveToken(token: string, name: string, accountType: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('accountType', accountType);
    this.loggedIn.set(true);
  }

  logout() {
    localStorage.clear();
    this.loggedIn.set(false);
  }

  isLoggedIn() {
    return this.loggedIn();
  }

  getName() {
    return localStorage.getItem('name');
  }

  getUserId(): number {
    const token = localStorage.getItem('token');
    if (!token) return 0;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return parseInt(payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
  }
}