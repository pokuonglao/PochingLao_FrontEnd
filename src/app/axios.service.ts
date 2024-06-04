import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

/**
 * The AxiosService class provides a centralized service for making HTTP requests
 * using Axios in an Angular application.
 */
@Injectable({
  providedIn: 'root' // This service will be available application-wide.
})
export class AxiosService {
  private axiosInstance: AxiosInstance; // Axios instance to handle HTTP requests

  /**
   * Constructor initializes the Axios instance with default configuration.
   */
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:8080", // Set the base URL for Axios requests
      headers: {
        'Content-Type': 'application/json' // Default content type for requests
      }
    });
  }
}
