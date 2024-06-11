import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ButtonsComponent } from '../buttons/buttons.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ContactWelcomeContentComponent } from '../contact-welcome-content/contact-welcome-content.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ButtonsComponent, LoginFormComponent, NgIf, FormsModule, ContactWelcomeContentComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'] // Make sure this is styleUrls, not styleUrl
})
export class ContactComponent implements OnInit {
  @Output() onSubmitMessageEvent = new EventEmitter();

  componentToShow: string = "welcome";
  responseData: any;

  name: string = "";
  email: string = "";
  message: string = "";

  constructor(private http: HttpClient, public authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.showComponent('messages');
    }
  }

  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

  onSubmitMessage(): void {
    const formData = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    this.onSubmitMessageEvent.emit(formData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getAuthToken()
    });

    this.http.post("ec2-54-176-212-42.us-west-1.compute.amazonaws.com/messages/addMessages", formData, { headers }).subscribe(
      (response: any) => {
        console.log('Data received:', response);
        if (response) {
          console.log('Message added successfully!');
          this.resetForm();
        } else {
          console.log('Failed to add message. Please try again later.');
        }
      },
      (error) => {
        console.error('Error adding message:', error);
      }
    );
  }

  resetForm(): void {
    this.name = "";
    this.email = "";
    this.message = "";
  }

  onLogin(input: any): void {
    this.authService.login(input.login, input.password).subscribe(
      (response: any) => {
        this.responseData = response;
        console.log('Login successful');

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
        console.log('Registration successful:', this.responseData);

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

  onLogout(): void {
    this.authService.logout();
    this.showComponent('welcome');
  }
}
