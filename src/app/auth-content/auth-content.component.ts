import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';
import { Messages } from '../../messages';

@Component({
  selector: 'app-auth-content',
  standalone: true,
  imports: [NgFor, LoginFormComponent],
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent implements OnInit {
  data: Messages[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthToken()
    });

  this.http.get<Messages[]>("http://localhost:8080/api/getMessages", { headers }).subscribe(
      (response: Messages[]) => {
        this.data = response;
        console.log('Data received:', this.data);
      },
      (error) => {
        this.errorMessage = 'Error fetching data: ' + error.message;
        console.error('Error fetching data:', error);
      }
    );
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }
}
