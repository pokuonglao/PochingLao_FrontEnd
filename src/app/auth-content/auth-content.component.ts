import { Component } from '@angular/core';
import { NgFor } from '@angular/common'; 
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-auth-content',
  standalone: true,
  imports: [ NgFor,LoginFormComponent],
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent {
  data: string[] = [];

  
}
