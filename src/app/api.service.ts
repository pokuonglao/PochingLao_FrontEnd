import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Update the URL to your API endpoint

  constructor(private http: HttpClient) {}

  // Example method to make a GET request
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data`);
  }

  // Example method to make a POST request
  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/post`, data);
  }
}