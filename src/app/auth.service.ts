import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  setAuthToken(token: string | null): void {
    if (typeof window !== 'undefined') {
      if (token !== null) {
        window.localStorage.setItem('auth_token', token);
      } else {
        window.localStorage.removeItem('auth_token');
      }
    }
  }

  getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('auth_token');
    }
    return null;
  }

  login(login: string, password: string): Observable<any> {
    return this.http.post('https://d3o19kh4z8vj4z.cloudfront.net/login', { login, password });
  }

  register(firstName: string, lastName: string, login: string, password: string): Observable<any> {
    return this.http.post('https://d3o19kh4z8vj4z.cloudfront.net/register', { firstName, lastName, login, password });
  }

  logout(): void {
    this.setAuthToken(null);
  }
}
