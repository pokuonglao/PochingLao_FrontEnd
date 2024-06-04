import { Component } from '@angular/core';
import { ButtonsComponent } from '../buttons/buttons.component';
import { WelcomeContentComponent } from '../welcome-content/welcome-content.component';
import { AuthContentComponent } from '../auth-content/auth-content.component';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [LoginFormComponent,ButtonsComponent,WelcomeContentComponent,AuthContentComponent,CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  componentToShow: string = "welcome";

  constructor(private apiService: ApiService) { }

  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

  onLogin(input: any): void {
    this.apiService.postData({
      endpoint: '/login',
      data: {
        login: input.login,
        password: input.password
      }
    }).subscribe(
      (response) => {
        this.apiService.setAuthToken(response.token);
        this.componentToShow = 'auth-content';
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
  
  onRegister(input: any): void {
    this.apiService.postData({
      endpoint: '/register',
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        login: input.login,
        password: input.password
      }
    }).subscribe(
      (response) => {
        this.apiService.setAuthToken(response.token);
        this.componentToShow = 'auth-content';
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }  
}