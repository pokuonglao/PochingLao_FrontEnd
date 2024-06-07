import { Component,OnInit  } from '@angular/core';
import { ButtonsComponent } from '../buttons/buttons.component';
import { WelcomeContentComponent } from '../welcome-content/welcome-content.component';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { DashboardMenuComponent } from '../dashboard-menu/dashboard-menu.component';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [LoginFormComponent,ButtonsComponent,WelcomeContentComponent,CommonModule,DashboardMenuComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {
  componentToShow: string = "welcome";
  responseData: any;

  constructor(private http: HttpClient, public authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.showComponent('messages');
    }
  }

  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

  onLogin(input: any): void {
    this.authService.login(input.login, input.password).subscribe(
      (response: any) => {
        this.responseData = response;
        console.log('Login successful:');

        if (this.responseData.token) {
          this.authService.setAuthToken(this.responseData.token);
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
    this.authService.register(input.firstName, input.lastName, input.login, input.password).subscribe(
      (response: any) => {
        this.responseData = response;
        console.log('Registration successful:');

        if (this.responseData.token) {
          this.authService.setAuthToken(this.responseData.token);
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

  onLogout(): void {
    this.authService.logout();
    this.showComponent('welcome');
  }
}