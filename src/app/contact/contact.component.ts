import { Component,EventEmitter,Output } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { ButtonsComponent } from '../buttons/buttons.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ButtonsComponent,LoginFormComponent,NgIf,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  @Output() onSubmitMessageEvent = new EventEmitter();

  componentToShow: string = "welcome";
  responseData: any;

  name: string = "";
  email: string = "";
  message: string = "";
  
  constructor(private http: HttpClient) {}

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
      'Authorization': 'Bearer ' + this.getAuthToken()
    });

    this.http.post("http://localhost:8080/api/addMessages", formData, { headers }).subscribe(
      (response: any) => {
        console.log('Data received:', response);
        if (response && response.success) {
          console.log('Message added successfully!');
          // Reset the form after successful submission
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

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  onLogin(input: any): void {
    this.http.post('http://localhost:8080/login', {
      login: input.login,
      password: input.password
    }).subscribe(
      (response: any) => {
        this.responseData = response;
        console.log('Login successful');
        
        // Store the token in localStorage
        if (this.responseData.token) {
          this.setAuthToken(this.responseData.token);
          this.showComponent('message');
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
          this.showComponent('message');
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
}