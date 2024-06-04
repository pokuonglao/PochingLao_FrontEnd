import { Component } from '@angular/core';
import { ButtonsComponent } from '../buttons/buttons.component';
import { WelcomeContentComponent } from '../welcome-content/welcome-content.component';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';
import { HttpClient } from '@angular/common/http';
import { AuthContentComponent } from '../auth-content/auth-content.component';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [LoginFormComponent,ButtonsComponent,WelcomeContentComponent,CommonModule,AuthContentComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  componentToShow: string = "welcome";
  responseData: any;

  constructor(private http: HttpClient) {}

  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

  onLogin(input: any): void {
    this.http.post('http://localhost:8080/login', {
      login: input.login,
      password: input.password
    }).subscribe(
      (response: any) => {
        this.responseData = response;
        console.log('Login successful:', this.responseData);
        
        // Store the token in localStorage
        if (this.responseData.token) {
          this.setAuthToken(this.responseData.token);
          this.showComponent('messages');
        } else {
          console.error('Token not found in response');
        }
      },
      (error) => {
        console.error('Error login:', error);
      }
    );
  }

  onRegister(input: any): void {
    this.http.post('http://localhost:8080/register', {
      firstName: input.firstName,
      lastName: input.lastName,
      login: input.login,
      password: input.password
    }).subscribe(
      (response: any) => {
        this.responseData = response;
        console.log('Registration successful:', this.responseData);

        // Store the token in localStorage
        if (this.responseData.token) {
          this.setAuthToken(this.responseData.token);
          this.showComponent('messages');
        } else {
          console.error('Token not found in response');
        }
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }
}