import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:8080",
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }

  async request(method: string, url: string, data: any): Promise<any> {
    try {
      const headers = this.getAuthToken() ? { "Authorization": "Bearer " + this.getAuthToken() } : {};
      const response = await this.axiosInstance({
        method: method,
        url: url,
        data: data,
        headers: headers
      });
      return response.data;
    } catch (error) {
      console.error('Axios request error:', error);
      throw error;
    }
  }
}
