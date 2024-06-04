import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-auth-content',
  standalone: true,
  imports: [NgFor, LoginFormComponent],
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent implements OnInit {
  data: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthToken()
    });

    this.http.get("http://localhost:8080/messages", { headers }).subscribe(
      (response: any) => {
        this.data = response;
        console.log('Data received:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }
}
