import { Component } from '@angular/core';
import { ButtonsComponent } from '../buttons/buttons.component';
import { WelcomeContentComponent } from '../welcome-content/welcome-content.component';
import { AuthContentComponent } from '../auth-content/auth-content.component';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [LoginFormComponent,ButtonsComponent,WelcomeContentComponent,AuthContentComponent,CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  componentToShow: string ="welcome";

}
