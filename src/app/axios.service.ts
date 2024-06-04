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

  /**
   * Gets the authentication token from local storage.
   * @returns The auth token if it exists, otherwise null.
   */
  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  /**
   * Sets or removes the authentication token in local storage.
   * @param token - The authentication token to set, or null to remove the token.
   */
  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }

  /**
   * Makes an HTTP request using Axios.
   * @param method - The HTTP method (e.g., 'GET', 'POST').
   * @param url - The endpoint URL.
   * @param data - The request payload data.
   * @returns A promise that resolves with the response data.
   * @throws An error if the request fails.
   */
  async request(method: string, url: string, data: any): Promise<any> {
    try {
      // Set authorization headers if auth token exists
      const headers = this.getAuthToken() ? { "Authorization": "Bearer " + this.getAuthToken() } : {};
      const response = await this.axiosInstance({
        method: method, // HTTP method
        url: url, // Endpoint URL
        data: data, // Request payload
        headers: headers // Custom headers including authorization
      });
      return response.data; // Return the response data
    } catch (error) {
      // Handle error appropriately, e.g., logging or rethrowing
      console.error('Axios request error:', error);
      throw error;
    }
  }
}
