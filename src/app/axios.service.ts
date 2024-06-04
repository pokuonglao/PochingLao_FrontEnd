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
  
}
